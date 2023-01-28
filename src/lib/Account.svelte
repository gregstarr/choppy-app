<script lang="ts">
  import { currentUser, pb } from "./pocketbase";

  let err_msg: string;
  let good_msg: string;

  async function reset_password() {
    await pb.collection("users").requestPasswordReset($currentUser.email)
      .then(()=>{good_msg = "sent password reset email"})
      .catch(handle_errors)
  }

  async function resend_verification() {
    await pb.collection("users").requestVerification($currentUser.email)
      .then(()=>{good_msg = "sent verification email"})
      .catch(handle_errors)
  }

  function handle_errors(err) {
    console.log(err.data);
    good_msg = "";
    err_msg = err.data.message;
  }
</script>

{#if good_msg}
<p>{good_msg}</p>
{/if}
{#if err_msg}
<p>{err_msg}</p>
{/if}

<button class="secondary" on:click={reset_password}>reset password</button>
<button class="secondary" on:click={resend_verification}>resend verification</button>

<style>
  
  p {
    color: green;
    font-size: medium;
  }
</style>
