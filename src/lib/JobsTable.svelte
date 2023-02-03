<script lang="ts">
  import moment from "moment";
  import { data, JobStatus } from "./defs";

</script>

<figure class="container">
<table role="grid">
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
          <a role="button" class="secondary outline download-button" href={job.file_url} download="output">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
          </a>
          {/if}
        </td>
        <td>{JobStatus[job.status]}</td>
      </tr>
    {/each}
  </tbody>
</table>
</figure>

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

  td {
    padding: 10px;
    max-width: 300px;
  }
  th {
    font-weight: 500;
    font-size: large;
  }
  td, input, select, a {
    font-size: medium;
  }
  input, select {
    margin: 0
  }
</style>
