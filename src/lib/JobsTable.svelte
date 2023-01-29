<script lang="ts">
  import moment from "moment";
  import { data, JobStatus } from "./defs";

  let loading = false

  function new_job() {
    loading = true;
    $data.new_job()
      .catch(err => console.log(err))
      .then(() => {loading = false})
  }

</script>

<div class="bc">
  <button
    class="outline contrast new-button"
    aria-busy={loading}
    on:click={new_job}
  >
    {#if !loading}
    <img src="/plus.svg" alt="new">
    {/if}
  </button>
</div>

<table>
  <thead>
    <tr>
      <th> Created </th>
      <th> File </th>
      <th> Printer </th>
      <th> Progress </th>
      <th> Download </th>
      <th> Status </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td />
      <td>
        <input type="file" id="file" name="file" required on:change={(e) => {$data.nj_data_change(e)}}
        />
      </td>
      <td>
        <select id="select-printer" required on:change={(e) => {$data.nj_data_change(e)}}>
          <option value="" selected>Printer</option>
          {#each $data.printer_list as printer (printer.id)}
            <option value={printer.id}>{printer.name}</option>
          {/each}
        </select>
      </td>
      <td />
      <td />
      <td />
    </tr>
    {#each $data.job_list as job (job.id)}
      <tr>
        <td>{moment(job.created).format("lll")}</td>
        <td>{job.input}</td>
        <td>{job.printer.name}</td>
        <td><progress value={job.progress} max="100" /></td>
        <td class="ctd">
          {#if job.status === JobStatus.Finished}
          <a role="button" class="secondary outline download-button" href={job.file_url} download="output"><img src="/download.svg" alt="download"></a>
          {/if}
        </td>
        <td>{JobStatus[job.status]}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  progress {
    margin-bottom: 0;
  }

  .ctd {
    text-align: center;
  }

  .download-button {
    padding: 5px 10px 5px 10px;
  }

  .new-button {
    max-width: 100px;
    margin-bottom: 10px;
    padding: 5px
  }

  .bc {
    display: flex;
    justify-content: start;
    width: 100%;
  }

  td {
    padding: 10px;
    max-width: 300px;
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
