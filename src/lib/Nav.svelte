<script lang="ts">
    import { DashboardTables } from "./pocketbase";
    export let table_name: DashboardTables;

</script>


<aside>
    <nav>
        <ul>
            <li>
                <button
                    class={table_name === DashboardTables.Jobs?"contrast":"secondary"}
                    on:click={() => {
                        table_name = DashboardTables.Jobs;
                    }}
                >
                    Jobs
                </button>
            </li>
            <li>
                <button
                class={table_name === DashboardTables.Printers?"contrast":"secondary"}
                    on:click={() => {table_name = DashboardTables.Printers;}}
                >
                    Printers
                </button>
            </li>
        </ul>
    </nav>
</aside>
