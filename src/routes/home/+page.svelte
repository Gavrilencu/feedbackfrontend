<script>
  import logo from "$lib/img/logo.png";
  import background from "$lib/img/background.png";
  import menu from "$lib/img/menu.png";
  import viz from "$lib/img/viz.png";
  import comp from "$lib/img/comp.png";
  import gest from "$lib/img/gest.png";
  let welcome = true;
  let showMenu = false;
  function openMenu() {
    showMenu = !showMenu;
    welcome = false;
  }
  let gestion = false;
  let view = false;
  let complete = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if showMenu}
  <div class="openMenu slide-in-left">
    <div
      class="dual"
      on:click={() => {
        showMenu = false;
        view = true;
        complete = false;
        gestion = false;
      }}
    >
      <img src={viz} alt="" class="ico" />
      <span class="list">Vizualizare feedbackuri completate </span>
    </div>
    <div
      class="dual"
      on:click={() => {
        showMenu = false;
        view = false;
        complete = true;
        gestion = false;
      }}
    >
      <img src={comp} alt="" class="ico" />
      <span class="list">Completare chestionar </span>
    </div>
    <div
      class="dual"
      on:click={() => {
        showMenu = false;
        view = false;
        complete = false;
        gestion = true;
      }}
    >
      <img src={gest} alt="" class="ico" />
      <span class="list">Gestionare chestionare </span>
    </div>
  </div>
{/if}
<img src={background} alt="" class="background" />
<main class="home">
  <img src={logo} alt="" class="logo slide-in-left" />
  <header class="header slide-in-fwd-right">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img src={menu} alt="" class="menu" on:click={openMenu} />
    <span class="username">Gavrilencu Grigore</span>
  </header>
  {#if welcome}
    <div class="app slide-in-fwd-bottom">
      <div class="info">Bun venit pe platforma de feedback OTP Bank</div>
    </div>
  {:else}
    <div class="area slide-in-fwd-right">
      {#if gestion}
        <div class="gestion"></div>
      {:else if view}
        <div class="view"></div>
      {:else if complete}
        <div class="complete"></div>
      {/if}
    </div>
  {/if}
</main>

<style>
  @-webkit-keyframes slide-in-fwd-bottom {
    0% {
      -webkit-transform: translateZ(-1400px) translateY(800px);
      transform: translateZ(-1400px) translateY(800px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateZ(0) translateY(0);
      transform: translateZ(0) translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-fwd-bottom {
    0% {
      -webkit-transform: translateZ(-1400px) translateY(800px);
      transform: translateZ(-1400px) translateY(800px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateZ(0) translateY(0);
      transform: translateZ(0) translateY(0);
      opacity: 1;
    }
  }
  .slide-in-fwd-bottom {
    -webkit-animation: slide-in-fwd-bottom 0.4s
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-in-fwd-bottom 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
  }
  @-webkit-keyframes slide-in-fwd-right {
    0% {
      -webkit-transform: translateZ(-1400px) translateX(1000px);
      transform: translateZ(-1400px) translateX(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateZ(0) translateX(0);
      transform: translateZ(0) translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-fwd-right {
    0% {
      -webkit-transform: translateZ(-1400px) translateX(1000px);
      transform: translateZ(-1400px) translateX(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateZ(0) translateX(0);
      transform: translateZ(0) translateX(0);
      opacity: 1;
    }
  }
  .slide-in-fwd-right {
    -webkit-animation: slide-in-fwd-right 0.4s
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-in-fwd-right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  @-webkit-keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  .slide-in-left {
    -webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
    animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  .list {
    color: #52ae30;
    font-size: 18px;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
  .dual {
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    margin-block: 10px;
    padding-left: 20px;
  }
  .ico {
    width: 40px;
    margin-right: 5px;
  }
  .openMenu {
    position: fixed;
    width: 350px;
    margin-top: 220px;
    box-shadow: 0px 0px 10px rgb(158, 158, 158);
    margin-left: 19.5%;
    height: 300px;
    z-index: 1;
    background-color: white;
    border-radius: 20px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
  }
  .area {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 0.95;
    background-color: white;
    border-radius: 30px;
  }
  .info {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    font-size: 30px;
    padding: 50px;
    text-align: center;
    color: #52ae30;
    background-color: white;
    width: 600px;
    height: 200px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .app {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .username {
    color: #52ae30;
    font-size: 18px;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
  .menu {
    cursor: pointer;
    width: 35px;
    height: 35px;
  }
  .header {
    display: flex;
    padding-inline: 25px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 64px;
    background-color: white;
    border-radius: 40px;
    margin-bottom: 40px;
  }
  .logo {
    width: 200px;
    margin-bottom: 3%;
  }
  .home {
    width: 100%;
    height: 100vh;
    position: relative;
    padding-inline: 19%;
    padding-top: 30px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
  }
  .background {
    width: 100%;
    height: 100vh;
    position: fixed;
    object-fit: fill;
  }
</style>
