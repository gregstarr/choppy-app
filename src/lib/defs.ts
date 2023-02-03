import type { Record } from "pocketbase";
import { pb, currentUser } from "./pocketbase"

export enum DashboardViews {
  Jobs,
  Printers,
  Account,
}

export enum LoginViews {
  Login,
  Signup,
  Forgot,
}

export enum JobStatus {
  Waiting,
  Processing,
  Finished,
  Failed
}

export const status_map = {
  "waiting": JobStatus.Waiting,
  "processing": JobStatus.Processing,
  "finished": JobStatus.Finished,
  "failed": JobStatus.Failed,
}

export interface Job {
  id: string;
  created: string;
  input: string;
  output: string;
  status: JobStatus;
  printer: Printer;
  progress?: number;
  file_url?: string;
}

export interface Printer {
  id: string
  name: string
  size_x: number
  size_y: number
  size_z: number
  tolerance: number
}

class DataManager {
  jobs: { [id: string]: Job } = {}
  printers: { [id: string]: Printer } = {}
  nj_form = new FormData()
  nj_printer: string | null = null;
  np_data = {
    name: null,
    size_x: null,
    size_y: null,
    size_z: null,
    tolerance: null,
    user: null,
  }
  allowed_ext = ["stl", "3mf"]
  user: string | null = null;
  _subscriptions: { [id: number]: Function } = {}
  _sub_num = 0

  get job_list() {
    let list = Object.values(this.jobs);
    list.sort( (a, b) => {return b.created.localeCompare(a.created)})
    return list
  }

  get printer_list() {
    let list = Object.values(this.printers);
    list.sort( (a, b) => {return a.name.localeCompare(b.name)})
    return list
  }

  subscribe(func: Function) {
    func(this)
    this._subscriptions[this._sub_num] = func
    const s = this._sub_num
    this._sub_num++
    return () => {delete this._subscriptions[s]}
  }

  call_subscriptions() {
    for( const func of Object.values(this._subscriptions) ) {
      func(this)
    }
  }

  constructor () {
    currentUser.subscribe(value => {
      console.log("updating current user in 'data'")
      this.user = value? value.id: null
    })
  }

  add_items_printer(items: Record[]) {
    for (let record of items.reverse()) {
      this.add_record_printer(record)
    }
    this.call_subscriptions()
  }

  add_record_printer(record: Record) {
    console.log(`adding printer record: ${record.id} (${record["name"]})`)
    const printer: Printer = {
      id: record.id,
      name: record["name"],
      size_x: record["size_x"],
      size_y: record["size_y"],
      size_z: record["size_z"],
      tolerance: record["tolerance"],
    }
    this.printers[printer.id] = printer
    return printer.id
  }

  async new_printer() {
    this.np_data.user = this.user
    const record = await pb.collection("printers").create(this.np_data);
    this.add_record_printer(record)
    this.call_subscriptions()
  }

  np_data_change(element) {
    console.log(`changing ${element.target.id} to ${element.target.value}`)
    this.np_data[element.target.id] = element.target.value
  }

  add_items_job(items: Record[]) {
    for (let record of items.reverse()) {
      this.add_record_job(record)
    }
    this.call_subscriptions()
  }

  add_record_job(record: Record) {
    console.log(`adding job record: ${record.id} (${record["status"]})`)
    let job: Job = {
      progress: (record["progress_tree"] + record["progress_connector"]) / 2,
      status: status_map[record["status"]],
      id: record["id"],
      created: record["created"],
      input: record["input"],
      output: record["output"],
      printer: this.printers[record["printer"]],
    }
    if( job.status === JobStatus.Finished ) {
      job.file_url = pb.getFileUrl(record, job.output);
    } else if ( job.status === JobStatus.Waiting || job.status === JobStatus.Processing ) {
      pb.collection("jobs").subscribe(job.id, (event) => {this.handle_job_update(event)});
    }
    this.jobs[job.id] = job
    return job.id
  }

  async new_job() {
    console.log({"printer": this.nj_printer, "user": this.user, "form": this.nj_form})
    this.nj_form.append("printer", this.nj_printer);
    this.nj_form.append("user", this.user);
    this.nj_form.append("status", "waiting")

    let input_file = this.nj_form.get("input") as Blob;
    let ext = input_file.name.split('.').pop();
    if ( !(this.allowed_ext.includes(ext.toLowerCase())) ) {
      throw "file type not supported"
    }
    const record = await pb.collection("jobs").create(this.nj_form);
    const job_id = this.add_record_job(record)
    await pb.collection("jobs").subscribe(job_id, (event) => {this.handle_job_update(event)});
    this.call_subscriptions()
  }

  handle_job_update(event) {
    console.log(event.record)
    const job_id = event.record.id
    if( !Object.hasOwn(this.jobs, job_id) ) return
    
    this.jobs[job_id].status = status_map[event.record.status];
    const progsum = event.record.progress_tree + event.record.progress_connector;
    this.jobs[job_id].progress = progsum / 2
    if( this.jobs[job_id].status === JobStatus.Finished || this.jobs[job_id].status === JobStatus.Failed) {
      pb.collection("jobs").unsubscribe(job_id)
      this.jobs[job_id].file_url = pb.getFileUrl(event.record, event.record.output);
    }
    this.call_subscriptions()
  }

  nj_data_change(element) {
    console.log({"element": element})
    if( element.target.id == "select-printer" ){
      this.nj_printer = element.target.value
    } else {
      this.nj_form = new FormData()
      this.nj_form.append("input", element.target.files[0])
    }    
  }
}

const data = new DataManager()
export { data }
