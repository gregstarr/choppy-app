<script lang="ts">
    import Dashboard from "./lib/Dashboard.svelte";
    import Login from "./lib/Login.svelte";
    import { currentUser, pb } from "./lib/pocketbase";

    async function logout() {
        pb.authStore.clear();
    }
</script>

<div class="title-text">
    <h1>Choppy</h1>
    <div class="container">
        {#if $currentUser}
            <p>Logged in as {$currentUser.username}</p>
            <a href="/" role="button" on:click={logout}>Log Out</a>
        {/if}
    </div>
</div>
<div class="line"></div>

{#if !$currentUser}

<div class="container"><Login /></div>

{:else}

<div class="dashboard-container"><Dashboard /></div>

{/if}

<style>
    .title-text {
        display: flex;
        justify-content: center;
        padding: 30px;
    }
    .dashboard-container {
        display: flex;
        flex-direction: row;
        column-gap: 10px;
        align-content:flex-start;
    }

    a {
        background-color: #757575;
        font-size: medium;
    }

    .line {
        background-color: grey;
        width: 100%;
        height: 2px;
    }
</style>