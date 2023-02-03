<script lang="ts">
  import { DashboardViews, data } from "./defs";
  export let table_name: DashboardViews;

  let loading = false;

  function new_entry() {
    if( table_name === DashboardViews.Jobs ) {
      loading = true;
      $data
        .new_job()
        .catch((err) => console.log(err))
        .then(() => {
          loading = false;
        });
    } else {
      $data.new_printer()
    }
  }
</script>


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
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-layout-wtf" viewBox="0 0 16 16">
        <path d="M5 1v8H1V1h4zM1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm13 2v5H9V2h5zM9 1a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9zM5 13v2H3v-2h2zm-2-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3zm12-1v2H9v-2h6zm-6-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H9z"/>
      </svg>
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
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-box" viewBox="0 0 16 16">
        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
      </svg>
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
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-person" viewBox="0 0 16 16">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
      </svg>
      </button>
    </li>
    <li><div class="line"></div></li>
    <li>
      <button
        class="outline contrast new-button"
        aria-busy={loading}
        disabled={table_name == DashboardViews.Account}
        on:click={new_entry}
      >
        {#if !loading}
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-plus" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        {/if}
      </button>
    </li>
  </ul>
</nav>

<style>
  .new-button {
    padding: 10px 30px 10px 30px;
  }

  .line {
    width: 2px;
    height: 50px;
    background-color: gray;
  }
</style>