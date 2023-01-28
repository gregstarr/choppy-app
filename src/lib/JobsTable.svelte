<script lang="ts">
  import { currentUser, pb } from "./pocketbase";
  import moment from "moment";
  import type { Record } from "pocketbase";

  export let jobs: Record[];
  export let printers: Record[];

  const form_data = new FormData();
  let newjob_printer: Record;
  let loading = false

  async function newJob() {
    try {
      loading = true
      form_data.append("printer", newjob_printer.id);
      form_data.append("user", $currentUser.id);
      form_data.append("status", "waiting")
      let ext: string = form_data.get("input").name.split('.').pop();
      if (!(["stl", "3mf"].includes(ext.toLowerCase()))
      const createdJob = await pb.collection("jobs").create(form_data);
      await pb.collection("jobs").subscribe(createdJob.id, handle_job_update);
      createdJob.expand.printer = newjob_printer;
      jobs.unshift(createdJob);
      jobs = jobs;
    } catch (err) {
      console.log(err.data);
    }
    loading = false
  }

  async function handle_job_update(event) {
    console.log(event.record)
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].id != event.record.id) continue
      jobs[i].progress_tree = event.record.progress_tree;
      jobs[i].progress_connector = event.record.progress_connector;
      jobs[i].status = event.record.status;
      if (event.record.status == "finished") {
        await pb.collection("jobs").unsubscribe(jobs[i].id)
        const url = pb.getFileUrl(event.record, event.record.output);
        jobs[i].url = url;
      }
      break
    }
  }

  const onFileSelected = (e) => {
    form_data.append("input", e.target.files[0]);
  };
</script>

<div class="bc">
  <button class="outline contrast new-button" aria-busy={loading} on:click={newJob}>{(loading? "": "New")}</button>
</div>

<table>
  <thead>
    <tr>
      <th> Created </th>
      <th> File </th>
      <th> Printer </th>
      <th> Progress Tree </th>
      <th> Progress Connector </th>
      <th> Download </th>
      <th> Status </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td />
      <td>
        <input type="file" id="file" name="file" required on:change={onFileSelected}
        />
      </td>
      <td>
        <select id="select-printer" required bind:value={newjob_printer}>
          <option value="" selected>Printer</option>
          {#each printers as printer (printer.id)}
            <option value={printer}>{printer.name}</option>
          {/each}
        </select>
      </td>
      <td />
      <td />
      <td />
      <td />
    </tr>
    {#each jobs as job (job.id)}
      <tr>
        <td>{moment(job.created).format("lll")}</td>
        <td>{job.input}</td>
        <td>{job.expand.printer.name}</td>
        <td><progress value={job.progress_tree} max="100" /></td>
        <td><progress value={job.progress_connector} max="100" /></td>
        <td>
          {#if job.status == "finished"}
          <a role="button" class="outline" href={job.url} download="output">Download</a>
          {:else}
          <a role="button" class="secondary outline" href="/" aria-disabled="true">Download</a>
          {/if}
        </td>
        <td>{job.status}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .new-button {
    max-width: 150px;
    margin-bottom: 10px;
  }

  .bc {
    display: flex;
    justify-content: start;
    width: 100%;
  }

  td {
    padding: 10px;
  }
  th {
    font-weight: 500;
    font-size: large;
  }
  td, input, select, button, a {
    font-size: medium;
  }
  input, select, button {
    margin: 0
  }
</style>
