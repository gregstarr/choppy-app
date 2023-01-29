<script lang="ts">
  import { currentUser, pb } from "./pocketbase";

  async function logout() {
    pb.authStore.clear();
  }
</script>

<div class="title-area">
  <a href="/" class="main-title">
    <img src="/logo.png" width="100px" height="100px" alt="" />
    <h1>Choppy</h1>
  </a>
  <div class="right-side">
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
</div>
<div class="line" />


<style>
  
  .right-side {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: flex-end;
    column-gap: 40px;
    margin-bottom: 10px;
  }
  .logout {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: flex-end;
  }
  .main-title {
    display: flex;
    align-items: center;
    column-gap: 10px;
    min-width: fit-content;
  }
  h1 {
    margin-bottom: 0;
  }

  .title-area {
    min-height: 150px;
    display: flex;
    justify-content: start;
    column-gap: 40px;
  }

  .line {
    background-color: grey;
    width: 100%;
    height: 2px;
  }
</style>
