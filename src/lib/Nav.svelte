<script lang="ts">
  import { DashboardViews } from "./defs";
  export let table_name: DashboardViews;
</script>

<aside>
  <nav>
    <ul>
      <li>
        <button
          class={table_name === DashboardViews.Jobs 
          ? "outline" 
          : "secondary"}
          on:click={() => {
            table_name = DashboardViews.Jobs;
          }}
        >
        <img src="/layout-wtf.svg" alt="jobs">
        </button>
      </li>
      <li>
        <button
          class={table_name === DashboardViews.Printers
            ? "outline"
            : "secondary"}
          on:click={() => {
            table_name = DashboardViews.Printers;
          }}
        >
        <img src="/box.svg" alt="printers">
        </button>
      </li>
      <li>
        <button
          class={table_name === DashboardViews.Account
            ? "outline"
            : "secondary"}
          on:click={() => {
            table_name = DashboardViews.Account;
          }}
        >
        <img src="/person.svg" alt="account">
        </button>
      </li>
    </ul>
  </nav>
</aside>
