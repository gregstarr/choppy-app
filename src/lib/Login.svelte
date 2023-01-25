<script lang="ts">
    import { currentUser, pb } from "./pocketbase";

    let signup_data = {
        username: null,
        email: null,
        password: null
    };
    let login_data = {
        username: null,
        password: null
    };
    
    let err_msgs = [];

    let show_login = true;

    async function login() {
        err_msgs = [];
        try {
            await pb
                .collection("users")
                .authWithPassword(login_data.username, login_data.password);
        } catch (err) {
            console.log(err.data);
            err_msgs.push(err.data.message);
            err_msgs = err_msgs;
        }
    }

    async function signUp() {
        err_msgs = [];
        try {
            const data = {
                username: signup_data.username,
                email: signup_data.email,
                emailVisibility: true,
                password: signup_data.password,
                passwordConfirm: signup_data.password,
            };
            const createdUser = await pb.collection("users").create(data);
            login_data.username = signup_data.username;
            login_data.password = signup_data.password;
            await login();
        } catch (err) {
            console.log(err.data);
            ["username", "email", "password"].forEach(key => {
                if (key in err.data.data) {
                    err_msgs.push(key + ": " + err.data.data[key].message);
                }
            });
            err_msgs = err_msgs;
        }
    }

    function toggleSignup() {
        show_login = !show_login;
        err_msgs = [];
            let invalid_str = {
            "username": "spelling",
            "email": "spelling",
            "password": "spelling",
        };
    }
</script>


<ul class="error-messages">
    {#each err_msgs as msg}
        <li>{msg}</li>
    {/each}
</ul>

<button class="secondary" on:click={toggleSignup}>
    {show_login ? "Sign Up" : "Log In"}
</button>

<hr>

{#if show_login}

    <form on:submit|preventDefault>
        <label for="login-username">
            Username or Email
            <input
                type="text"
                bind:value={login_data.username}
                required
                id="login-username"
            />
        </label>
        <label for="login-password">
            Password
            <input
                type="password"
                bind:value={login_data.password}
                required
                id="login-password"
            />
        </label>
        <button on:click={login}>login</button>
    </form>

{:else}

    <form on:submit|preventDefault>
        <label for="signup-username">
            Username
            <input
                type="text"
                bind:value={signup_data.username}
                id="signup-username"
            />
        </label>
        <label for="signup-email">
            Email
            <input
                type="text"
                bind:value={signup_data.email}
                id="signup-email"
            />
        </label>
        <label for="signup-password">
            Password
            <input
                type="password"
                bind:value={signup_data.password}
                id="signup-password"
            />
        </label>
        <button on:click={signUp}>signup</button>
    </form>
{/if}


<style>
    .error-messages {
        color: red;
        font-size: medium;
    }
</style>