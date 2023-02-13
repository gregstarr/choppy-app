<script lang="ts">
  import { currentUser, pb } from "./pocketbase";
  import { data } from "./defs"

  async function logout() {
    pb.authStore.clear();
  }

  export let n_success: number;
  export let n_total: number;
</script>

<div class="title-area">
  <a href="/" class="main-title">
    <img src="/logo.png" width="80px" height="80px" alt="" />
    <h1>Choppy</h1>
  </a>
  <div class="status">
    <svg xmlns="http://www.w3.org/2000/svg" width="168.5" height="30" viewBox="0 0 168.5 35">
      <rect class="svg__rect" x="0" y="0" width="85.53" height="35" fill="#FFFFFF"/>
      <rect class="svg__rect" x="83.53" y="0" width="84.97000000000001" height="35" fill="#E46C17"/>
      <path class="svg__text" d="M13.78 19.42L13.78 19.42L15.27 19.42Q15.27 20.15 15.75 20.55Q16.23 20.95 17.12 20.95L17.12 20.95Q17.90 20.95 18.29 20.63Q18.68 20.32 18.68 19.80L18.68 19.80Q18.68 19.24 18.28 18.94Q17.89 18.63 16.85 18.32Q15.82 18.01 15.21 17.63L15.21 17.63Q14.05 16.90 14.05 15.72L14.05 15.72Q14.05 14.69 14.89 14.02Q15.73 13.35 17.07 13.35L17.07 13.35Q17.96 13.35 18.66 13.68Q19.36 14.01 19.75 14.61Q20.15 15.22 20.15 15.96L20.15 15.96L18.68 15.96Q18.68 15.29 18.26 14.91Q17.84 14.54 17.06 14.54L17.06 14.54Q16.33 14.54 15.93 14.85Q15.53 15.16 15.53 15.71L15.53 15.71Q15.53 16.18 15.96 16.50Q16.40 16.81 17.39 17.10Q18.39 17.40 18.99 17.78Q19.60 18.16 19.88 18.65Q20.16 19.13 20.16 19.79L20.16 19.79Q20.16 20.86 19.34 21.49Q18.52 22.12 17.12 22.12L17.12 22.12Q16.20 22.12 15.42 21.77Q14.64 21.43 14.21 20.83Q13.78 20.22 13.78 19.42ZM26.13 14.66L23.49 14.66L23.49 13.47L30.26 13.47L30.26 14.66L27.60 14.66L27.60 22L26.13 22L26.13 14.66ZM34.80 22L33.25 22L36.48 13.47L37.81 13.47L41.04 22L39.49 22L38.79 20.01L35.49 20.01L34.80 22ZM37.14 15.28L35.90 18.82L38.38 18.82L37.14 15.28ZM46.67 14.66L44.04 14.66L44.04 13.47L50.80 13.47L50.80 14.66L48.14 14.66L48.14 22L46.67 22L46.67 14.66ZM54.42 19.16L54.42 19.16L54.42 13.47L55.90 13.47L55.90 19.18Q55.90 20.03 56.33 20.48Q56.77 20.93 57.61 20.93L57.61 20.93Q59.32 20.93 59.32 19.13L59.32 19.13L59.32 13.47L60.80 13.47L60.80 19.17Q60.80 20.53 59.93 21.32Q59.06 22.12 57.61 22.12L57.61 22.12Q56.15 22.12 55.29 21.33Q54.42 20.55 54.42 19.16ZM64.94 19.42L64.94 19.42L66.42 19.42Q66.42 20.15 66.90 20.55Q67.38 20.95 68.28 20.95L68.28 20.95Q69.05 20.95 69.44 20.63Q69.83 20.32 69.83 19.80L69.83 19.80Q69.83 19.24 69.43 18.94Q69.04 18.63 68.01 18.32Q66.97 18.01 66.37 17.63L66.37 17.63Q65.20 16.90 65.20 15.72L65.20 15.72Q65.20 14.69 66.04 14.02Q66.88 13.35 68.22 13.35L68.22 13.35Q69.11 13.35 69.81 13.68Q70.51 14.01 70.91 14.61Q71.31 15.22 71.31 15.96L71.31 15.96L69.83 15.96Q69.83 15.29 69.41 14.91Q68.99 14.54 68.21 14.54L68.21 14.54Q67.48 14.54 67.08 14.85Q66.68 15.16 66.68 15.71L66.68 15.71Q66.68 16.18 67.12 16.50Q67.55 16.81 68.55 17.10Q69.54 17.40 70.14 17.78Q70.75 18.16 71.03 18.65Q71.31 19.13 71.31 19.79L71.31 19.79Q71.31 20.86 70.49 21.49Q69.68 22.12 68.28 22.12L68.28 22.12Q67.35 22.12 66.57 21.77Q65.80 21.43 65.37 20.83Q64.94 20.22 64.94 19.42Z" fill="#000000"/>
      <path class="svg__text" d="M99.14 22L96.71 22L100.42 13.60L102.76 13.60L106.48 22L104.01 22L103.35 20.37L99.80 20.37L99.14 22ZM101.57 15.93L100.49 18.61L102.65 18.61L101.57 15.93ZM117.02 22L110.63 22L110.63 13.60L113.01 13.60L113.01 20.11L117.02 20.11L117.02 22ZM123.82 22L121.44 22L121.44 13.60L125.28 13.60Q126.42 13.60 127.26 13.98Q128.10 14.35 128.56 15.06Q129.01 15.76 129.01 16.71L129.01 16.71Q129.01 17.66 128.56 18.35Q128.10 19.05 127.26 19.42Q126.42 19.80 125.28 19.80L125.28 19.80L123.82 19.80L123.82 22ZM123.82 15.47L123.82 17.93L125.13 17.93Q125.87 17.93 126.24 17.61Q126.61 17.29 126.61 16.71L126.61 16.71Q126.61 16.12 126.24 15.80Q125.87 15.47 125.13 15.47L125.13 15.47L123.82 15.47ZM136.14 22L133.76 22L133.76 13.60L136.14 13.60L136.14 16.76L139.38 16.76L139.38 13.60L141.76 13.60L141.76 22L139.38 22L139.38 18.72L136.14 18.72L136.14 22ZM148.34 22L145.91 22L149.62 13.60L151.96 13.60L155.68 22L153.21 22L152.55 20.37L149.00 20.37L148.34 22ZM150.77 15.93L149.69 18.61L151.85 18.61L150.77 15.93Z" fill="#FFFFFF" x="96.53"/>
    </svg>
    <h3>Stats:</h3>
    <p>
      {n_success}
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-check" viewBox="4 4 10 10">
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
      </svg>
      <br>
      {n_total - n_success}
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x" viewBox="4 4 10 10">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </p>
    <p>({n_success / n_total})</p>
  </div>
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
  svg {
    padding: 0;
    margin: 0;
  }
  p {
    margin: 0;
    padding: 0;
    font-size: large;
    line-height: normal;
  }

  h3 {
    margin: 0;
    font-size: x-large;
  }

  .status {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    column-gap: 10px;
    margin: 15px;
    padding: 10px;
    border: solid 1px rgba(25, 180, 230, .5);
    background-color: rgba(50, 50, 50, 1);
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 20px,
      black 20px,
      black 40px
  );
  }
  
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
    min-height: 120px;
    display: flex;
    justify-content: start;
    column-gap: 100px;
    padding: 10px;
    flex-wrap: wrap;
  }

  .line {
    background-color: grey;
    width: 100%;
    height: 2px;
  }
</style>
