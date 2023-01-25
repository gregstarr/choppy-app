<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { currentUser, pb } from "./pocketbase";
    import type { Record } from "pocketbase";

    export let printers: Record[];

    let printer_data = {
        name: null,
        x: null,
        y: null,
        z: null,
        tolerance: null
    };

    async function newPrinter() {
        try {
            const data = {
                "name": printer_data.name,
                "size_x": printer_data.x,
                "size_y": printer_data.y,
                "size_z": printer_data.z,
                "tolerance": printer_data.tolerance,
                "user": $currentUser.id
            };
            const createdPrinter = await pb.collection("printers").create(data);
            printers.unshift(createdPrinter);
            printers = printers;
        } catch (err) {
            console.log(err.data);
        }
    }

</script>

<div class="bc">
    <button class="outline contrast" on:click={newPrinter}>New</button>
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
            <th scope="row"><input type="text" placeholder="name" required bind:value={printer_data.name}></th>
            <td><input type="text" placeholder="x" required bind:value={printer_data.x}></td>
            <td><input type="text" placeholder="y" required bind:value={printer_data.y}></td>
            <td><input type="text" placeholder="z" required bind:value={printer_data.z}></td>
            <td><input type="text" placeholder="tolerance" required bind:value={printer_data.tolerance}></td>
        </tr>
        {#each printers as printer (printer.id)}
            <tr>
                <th scope="row">{printer.name}</th>
                <td>{printer.size_x}</td>
                <td>{printer.size_y}</td>
                <td>{printer.size_z}</td>
                <td>{printer.tolerance}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    button {
        font-size: medium;
        max-width: 150px;
    }

    .bc {
        display: flex;
        justify-content: start;
        width: 100%;
    }
</style>