<script lang="ts">
    import { currentUser, pb } from "./pocketbase";
    import moment from 'moment';
    import type { Record } from "pocketbase";

    export let jobs: Record[];
    export let printers: Record[];

    const form_data = new FormData();
    let newjob_printer: Record;

    async function newJob() {
        try {
            form_data.append("printer", newjob_printer.id);
            form_data.append("user", $currentUser.id);
            console.log(form_data.values());
            const createdJob = await pb.collection("jobs").create(form_data);
            createdJob.expand.printer = newjob_printer;
            jobs.unshift(createdJob);
            jobs = jobs;
        } catch (err) {
            console.log(err.data);
        }
    }

    const onFileSelected =(e)=>{
        form_data.append("input", e.target.files[0]);
    }
</script>


<div class="bc">
    <button class="outline contrast new-button" on:click={newJob}>New</button>
</div>


<table>
    <thead>
        <tr>
            <th scope="col"> Created </th>
            <th scope="col"> File </th>
            <th scope="col"> Printer </th>
            <th scope="col"> Progress Tree </th>
            <th scope="col"> Progress Connector </th>
            <th scope="col"> Download </th>
        </tr>
    </thead>
    <tbody>
        <tr>
        
            <th scope="row"></th>
            <td>
                <input type="file" id="file" name="file" required on:change={onFileSelected}>
            </td>
            <td>
                <select id="select-printer" required bind:value={newjob_printer}>
                <option value="" selected>Printer</option>
                {#each printers as printer (printer.id)}
                    <option value={printer}>{printer.name}</option>
                {/each}
                </select>
            </td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        {#each jobs as job (job.id)}
            <tr>
                <th scope="row">{moment(job.created).format("lll")}</th>
                <td>{job.input}</td>
                <td>{job.expand.printer.name}</td>
                <td><progress value={job.progress_tree} max="100"></progress></td>
                <td><progress value={job.progress_connector} max="100"></progress></td>
                <td>
                    <button
                        class="outline download-button"
                    >
                        Download
                    </button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    .download-button {
        font-size: medium;
    }

    .new-button {
        font-size: medium;
        max-width: 150px;
    }

    .bc {
        display: flex;
        justify-content: start;
        width: 100%;
    }
</style>