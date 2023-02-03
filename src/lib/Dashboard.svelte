<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { pb } from "./pocketbase";
  import type { Record } from "./pocketbase";
  import JobsTable from "./JobsTable.svelte";
  import PrintersTable from "./PrintersTable.svelte";
  import Account from "./Account.svelte";
  import Nav from "./Nav.svelte";
  import { DashboardViews, data } from "./defs";

  let table_name = DashboardViews.Jobs;

  onMount(async () => {
    console.log("getting printers");
    const printers_result = await pb.collection("printers").getList(1, 50);
    $data.add_items_printer(printers_result.items);

    console.log("getting jobs");
    const jobs_result = await pb.collection("jobs").getList(1, 50);
    $data.add_items_job(jobs_result.items);
  });
</script>

<Nav bind:table_name />

{#if table_name === DashboardViews.Jobs}
  <JobsTable />
{:else if table_name === DashboardViews.Printers}
  <PrintersTable />
{:else if table_name === DashboardViews.Account}
  <Account />
{/if}

<style>
</style>
