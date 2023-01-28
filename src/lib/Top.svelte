<script lang="ts">
  import { currentUser, pb } from "./pocketbase";

  async function logout() {
    pb.authStore.clear();
  }
</script>

<div class="title-area">
  <a href="/" class="main-title">
    <img src="/logo.png" alt="" />
    <h1>Choppy</h1>
  </a>
  <div class="logout">
    {#if $currentUser}
    {#if $currentUser.verified}
    {$currentUser.username}
    {:else}
      {$currentUser.username}: Verify email address
    {/if}  
    <a href="/" on:click={logout}>Log Out</a>
    {/if}
  </div>
</div>
<div class="line" />


<style>
  .logout {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: flex-end;
  }
  .main-title {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
  h1 {
    margin-bottom: 0;
  }
  img {
    height: 100px;
  }

  .title-area {
    min-height: 150px;
    display: flex;
    justify-content: start;
  }

  .line {
    background-color: grey;
    width: 100%;
    height: 2px;
  }
</style>
