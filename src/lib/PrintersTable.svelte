<script lang="ts">
  import { data } from "./defs";

</script>

<div class="bc">
  <button class="outline contrast new-button" on:click={$data.new_printer}>New</button>
</div>

<table>
  <thead>
    <tr>
      <th scope="col"> Name </th>
      <th scope="col"> Size X </th>
      <th scope="col"> Size Y </th>
      <th scope="col"> Size Z </th>
      <th scope="col"> Tolerance </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td
        ><input
          type="text"
          placeholder="name"
          required
          id="name"
          on:change={(e) => {$data.np_data_change(e)}}
        /></td
      >
      <td
        ><input
          type="text"
          placeholder="x"
          required
          id="size_x"
          on:change={(e) => {$data.np_data_change(e)}}
        /></td
      >
      <td
        ><input
          type="text"
          placeholder="y"
          required
          id="size_y"
          on:change={(e) => {$data.np_data_change(e)}}
        /></td
      >
      <td
        ><input
          type="text"
          placeholder="z"
          required
          id="size_z"
          on:change={(e) => {$data.np_data_change(e)}}
        /></td
      >
      <td
        ><input
          type="text"
          placeholder="tolerance"
          required
          id="tolerance"
          on:change={(e) => {$data.np_data_change(e)}}
        /></td
      >
    </tr>
    {#each $data.printer_list as printer (printer.id)}
      <tr>
        <td>{printer.name}</td>
        <td>{printer.size_x}</td>
        <td>{printer.size_y}</td>
        <td>{printer.size_z}</td>
        <td>{printer.tolerance}</td>
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
  td,
  input,
  button {
    font-size: medium;
  }
  input,
  button {
    margin: 0;
  }
</style>
