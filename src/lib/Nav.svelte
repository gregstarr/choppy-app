<script lang="ts">
  import { DashboardViews } from "./pocketbase";
  export let table_name: DashboardViews;
</script>

<aside>
  <nav>
    <ul>
      <li>
        <button
          class={table_name === DashboardViews.Jobs ? "contrast" : "secondary"}
          on:click={() => {
            table_name = DashboardViews.Jobs;
          }}
        >
          Jobs
        </button>
      </li>
      <li>
        <button
          class={table_name === DashboardViews.Printers
            ? "contrast"
            : "secondary"}
          on:click={() => {
            table_name = DashboardViews.Printers;
          }}
        >
          Printers
        </button>
      </li>
      <li>
        <button
          class={table_name === DashboardViews.Account
            ? "contrast"
            : "secondary"}
          on:click={() => {
            table_name = DashboardViews.Account;
          }}
        >
          Account
        </button>
      </li>
    </ul>
  </nav>
</aside>
