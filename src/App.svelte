<script lang="ts">
  import Dashboard from "./lib/Dashboard.svelte";
  import Login from "./lib/Login.svelte";
  import { currentUser, pb } from "./lib/pocketbase";
  import Top from "./lib/Top.svelte";
  import {onMount} from "svelte"

  onMount( async () => {
    console.log("updating auth")
    await pb.collection('users').authRefresh()
      .catch((err) => {
        console.log(err)
        pb.authStore.clear()
      });
  })

</script>

<Top />

{#if !$currentUser}
  <div class="container"><Login /></div>
{:else}
  <div class="dashboard-container"><Dashboard /></div>
{/if}

<style>
  .dashboard-container {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    align-content: flex-start;
  }
</style>
