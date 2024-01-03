<script>
  import logo from "$lib/img/logo.png";
  import background from "$lib/img/background.png";
  import { onMount } from "svelte";
  import { Autentification } from "$lib/index.js";
  onMount(() => {
    Autentification();
  });
</script>

<img src={background} alt="" class="background" />
<main class="app">
  <div class="header">
    <img src={logo} alt="" class="logo" />
  </div>

  <div class="load">
    <div class="loader"></div>
  </div>
</main>

<style>
  .load {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .header {
    height: 80px;
    display: flex;
    align-items: end;
    padding-inline: 20%;
  }
  .logo {
    width: 200px;
  }
  .app {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: start;
    position: relative;
    flex-direction: column;
  }
  .background {
    width: 100%;
    height: 100vh;
    position: fixed;
    object-fit: fill;
  }

  .loader {
    width: 100px;
    aspect-ratio: 1;
    display: grid;
    -webkit-mask: conic-gradient(from 15deg, #0000, #000);
    animation: l26 1s infinite steps(12);
  }
  .loader,
  .loader:before,
  .loader:after {
    background:
      radial-gradient(closest-side at 50% 12.5%, #ffffff 96%, #0000) 50% 0/20%
        80% repeat-y,
      radial-gradient(closest-side at 12.5% 50%, #ffffff 96%, #0000) 0 50%/80%
        20% repeat-x;
  }
  .loader:before,
  .loader:after {
    content: "";
    grid-area: 1/1;
    transform: rotate(30deg);
  }
  .loader:after {
    transform: rotate(60deg);
  }

  @keyframes l26 {
    100% {
      transform: rotate(1turn);
    }
  }
</style>
