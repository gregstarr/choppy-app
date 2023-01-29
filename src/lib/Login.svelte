<script lang="ts">
  import { pb } from "./pocketbase";
  import { LoginViews } from "./defs";


  let form_data = {
    username: null,
    email: null,
    password: null,
    confirm_password: null,
  };

  let err_msgs = [];
  let good_msg: string;

  let view = LoginViews.Login;

  async function login() {
    err_msgs = [];
    good_msg = "";
    await pb.collection("users").authWithPassword(form_data.username, form_data.password)
      .catch(handle_form_errors)
  }

  async function forgot_password() {
    err_msgs = [];
    good_msg = "";
    await pb.collection("users").requestPasswordReset(form_data.email)
      .then(()=>{good_msg = "send password reset email"})
      .catch(handle_form_errors)
  }

  async function signUp() {
    err_msgs = [];
    good_msg = "";
    const data = {
      username: form_data.username,
      email: form_data.email,
      emailVisibility: true,
      password: form_data.password,
      passwordConfirm: form_data.confirm_password,
    };
    await pb.collection("users").create(data)
      .then(async () => {
        await pb.collection("users").requestVerification(data.email);
      }).then(async () => {
        await login();
      }).catch(handle_form_errors);
  }

  function handle_form_errors(err) {
    console.log(err.data);
    good_msg = "";
    err_msgs.push(err.data.message);
    ["username", "email", "password"].forEach((key) => {
      if (key in err.data.data) {
        err_msgs.push(key + ": " + err.data.data[key].message);
      }
    });
    err_msgs = err_msgs;
  }

</script>

<ul class="error-messages">
  {#each err_msgs as msg}
    <li>{msg}</li>
  {/each}
</ul>
{#if good_msg}
<p>{good_msg}</p>
{/if}


<div class="top-bar">
  <button class={`outline ${view === LoginViews.Login ? "contrast" : "secondary"}`} on:click={()=>{view=LoginViews.Login}}>Log in</button>
  <button class={`outline ${view === LoginViews.Signup ? "contrast" : "secondary"}`} on:click={()=>{view=LoginViews.Signup}}>Sign up</button>
  <button class={`outline ${view === LoginViews.Forgot ? "contrast" : "secondary"}`} on:click={()=>{view=LoginViews.Forgot}}>forgot password</button>
</div>

<hr />

{#if view === LoginViews.Login}

<form on:submit|preventDefault>
  <label for="login-username">
    Username or Email
    <input
      type="text"
      bind:value={form_data.username}
      required
      autocomplete="username"
      id="login-username"
    />
  </label>
  <label for="login-password">
    Password
    <input
      type="password"
      bind:value={form_data.password}
      required
      id="login-password"
      autocomplete="current-password"
    />
  </label>
  <button on:click={login}>login</button>
</form>
    
{:else if view === LoginViews.Signup}

<form on:submit|preventDefault>
  <label for="signup-username">
    Username
    <input
      type="text"
      bind:value={form_data.username}
      id="signup-username"
      autocomplete="username"
    />
  </label>
  <label for="signup-email">
    Email
    <input
      type="text"
      bind:value={form_data.email}
      id="signup-email"
      autocomplete="email"
    />
  </label>
  <label for="signup-password">
    Password
    <input
      type="password"
      bind:value={form_data.password}
      id="signup-password"
      autocomplete="new-password"
    />
  </label>
  <label for="confirm-password">
    Confirm Password
    <input
      type="password"
      bind:value={form_data.confirm_password}
      id="confirm-password"
    />
  </label>
  <button on:click={signUp}>signup</button>
</form>

{:else if view === LoginViews.Forgot}

<form on:submit|preventDefault>
  <label for="forgot-email">
    Email
    <input
      type="text"
      bind:value={form_data.email}
      required
      id="forgot-email"
      autocomplete="email"
    />
  </label>
  <button on:click={forgot_password}>send reset</button>
</form>

{/if}

<style>
  .error-messages {
    color: red;
    font-size: medium;
  }
  .top-bar {
    display: flex;
    column-gap: 10px;
  }
  p {
    color: green;
    font-size: medium;
  }
</style>
