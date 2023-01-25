<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { currentUser, pb, DashboardTables } from "./pocketbase";
    import JobsTable from "./JobsTable.svelte";
    import PrintersTable from "./PrintersTable.svelte";
    import Nav from "./Nav.svelte";

    let table_name = DashboardTables.Jobs;

    let jobs = [];
    let printers = [];

    onMount(async () => {
        console.log("getting jobs")
        const jobs_result = await pb.collection("jobs").getList(1, 50, {
            sort: "-created",
            expand: "printer"
        });
        jobs = jobs_result.items;
        console.log(jobs)

        const printers_result = await pb.collection("printers").getList(1, 50, {
            sort: "-created"
        });
        printers = printers_result.items;
        console.log(printers)
    });
</script>


<div class="d-container thin">
    <h3 class="d-header">Menu</h3>
    <Nav bind:table_name={table_name} />
</div>

<div class="line"></div>

<div class="d-container">
    {#if table_name === DashboardTables.Jobs}
        <JobsTable bind:jobs={jobs} printers={printers}/>
    {:else if table_name === DashboardTables.Printers}
        <PrintersTable bind:printers={printers}/>
    {/if}
</div>


<style>
    .line {
        background-color: gray;
        width: 2px;
    }
    .d-header {
        max-height: 50px;
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
    }
    .thin {
        max-width: 150px;
    }
</style>