<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { pb } from "./pocketbase";
    import type { Record } from "./pocketbase"
    import JobsTable from "./JobsTable.svelte";
    import PrintersTable from "./PrintersTable.svelte";
    import Account from "./Account.svelte"
    import Nav from "./Nav.svelte";
    import { DashboardViews, data } from "./defs";

    let table_name = DashboardViews.Jobs;

    onMount(async () => {
        console.log("getting printers")
        const printers_result = await pb.collection("printers").getList(1, 50);
        $data.add_items_printer(printers_result.items)

        console.log("getting jobs")
        const jobs_result = await pb.collection("jobs").getList(1, 50);
        $data.add_items_job(jobs_result.items);
    });
</script>


<div class="d-container thin">
    <h3 class="d-header">Menu</h3>
    <Nav bind:table_name={table_name} />
</div>

<div class="line"></div>

<div class="d-container">
    {#if table_name === DashboardViews.Jobs}
        <JobsTable />
    {:else if table_name === DashboardViews.Printers}
        <PrintersTable />
    {:else if table_name === DashboardViews.Account}
        <Account />
    {/if}
</div>


<style>
    .line {
        background-color: gray;
        width: 2px;
    }
    .d-header {
        max-height: 50px;
        margin-bottom: 20px;
    }
    .d-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: start;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
        min-height: 400px;
    }
    .thin {
        max-width: 150px;
    }
</style>