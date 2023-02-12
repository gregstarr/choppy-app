<script lang="ts">
  import Dashboard from "./lib/Dashboard.svelte";
  import Login from "./lib/Login.svelte";
  import { currentUser, pb } from "./lib/pocketbase";
  import Top from "./lib/Top.svelte";
  import Readme from "./lib/Readme.svelte";
  import { onMount } from "svelte"
  import Footer from "./lib/Footer.svelte";

  let n_success = 0;
  let n_total = 0;

  onMount( async () => {
    pb.collection('success_rate').getOne('hnjqu2jrruix7iy').then( (record) => {      
      n_success = record["n_success"];
      n_total = record["n_total"];
    });
    
    if( $currentUser ) {
      console.log("updating auth")
      await pb.collection('users').authRefresh()
        .catch((err) => {
          console.log(err)
          pb.authStore.clear()
        });
    }
  })

</script>

<Top n_success={n_success} n_total={n_total}/>

{#if !$currentUser}
  <div class="container"><Login /></div>
{:else}
  <div class="container"><Dashboard /></div>
{/if}

<div class="line container-fluid"></div>
<div class="container">
  <Readme />
</div>

<Footer />


<style>
  .line {
    background-color: gray;
    width: 100%;
    height: 2px;
    margin-bottom: 30px;
  }

</style>
