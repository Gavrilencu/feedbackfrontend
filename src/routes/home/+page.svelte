<script>
  import close from "$lib/img/close.png";
  import logo from "$lib/img/logo.png";
  import background from "$lib/img/background.png";
  import menu from "$lib/img/menu.png";
  import viz from "$lib/img/viz.png";
  import comp from "$lib/img/comp.png";
  import gest from "$lib/img/gest.png";
  import arr from "$lib/img/arr.png";
  import jos from "$lib/img/Path.png";
  import rename from "$lib/img/rename.png";
  import add from "$lib/img/add.png";
  import delet from "$lib/img/delete.png";
  import deletegray from "$lib/img/deletegri.png";
  import addwhite from "$lib/img/addwhite.png";
  import { onMount } from "svelte";
  import { Auth } from "../../lib/index";
  onMount(() => {
    Auth();
    getListOfChestionar();
    getListOfPerson();
  });
  let welcome = false;
  let showMenu = false;
  function openMenu() {
    showMenu = !showMenu;
  }
  let gestion = true;
  let savewithsucces = false;
  let editchestionar = false;
  let view = false;
  let complete = false;
  let errorondelete = false;
  let expanddelete = false;
  let expanddeleteico = true;
  let expandrename = false;
  let expandrenameico = true;
  let expandadd = false;
  let expandaddico = true;
  let addChestionar = false;
  let succes = false;
  let allfeedback = false;
  let permision = false;
  let selectPerson = false;
  let complected;
  let responseforquestion = {};
  let complectedwithsucces = false;
  let forPerson = null;
  //for question
  let removeQ = false;
  let editQ = false;
  ///for question icons

  let addQuestion = false;
  let idquestion = "";
  let editquestion = true;
  //                 ==========                               Lista de chestionare              =============
  let listofchestionar;
  let questionName;
  let feed = false;
  let feedbackonly;
  let colegsfeed;
  let multiquestion = false;
  $: console.log(listt);
  $: console.log(alllist);
  let alllist = [];
  let listt = [];

  let nextid = 1;
  function addInput() {
    let newlist = "v" + nextid;
    listt = [...listt, { [newlist]: "" }];
    nextid++;
    alllist.push(listt);
  }

  function deleteInput(propretyName) {
    listt = listt.filter((item) => !item.hasOwnProperty(propretyName));
  }
  function upadateValue(index, event) {
    const propretyName = Object.keys(listt[index])[0];
    listt[index][propretyName] = event.target.value;
  }

  let showDetails = new Array(colegsfeed?.forPerson);
  function toggleDetails(index) {
    showDetails[index] = !showDetails[index];
  }
  let emptydata = false;

  ///////////

  async function addMultiQuestion() {
    const url = "/feedback/api/Intrebari/multiple";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listt),
    });
  }

  async function getFeedbackColegs() {
    const url = "/feedback/api/UserResponse/responses-for-all/" + idChestionar;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      colegsfeed = data;
    }
    if (response.status === 404) {
      emptydata = true;
    }
  }

  async function getChestionarFeedback() {
    const url = "/feedback/api/Chestionare/feedback-only";
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      feedbackonly = data;
    }
  }

  async function getResponse() {
    const url = "/feedback/api/UserResponse/" + idChestionar + "/" + username;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      complected = data;
    }
  }
  let chlist;
  async function getChestionarList() {
    const url = "/feedback/api/Chestionare/excluding-feedback";
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      chlist = data;
    }
  }

  async function getListOfChestionar() {
    const url = "/feedback/api/Chestionare";
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      listofchestionar = data;
    } else {
      alert("S-a produs o eroare la incarcarea chestionarelor");
    }
  }
  //
  $: if (feed === "feedback") {
    selectPerson = true;
  }
  //              =====================                    Creaza chestionar        =================
  let chestionarname;
  let username = sessionStorage.getItem("username");
  let isFeedback = false;
  function feedback() {
    isFeedback = !isFeedback;
  }
  let tip = "";
  $: if (isFeedback) {
    tip = "feedback";
  }
  $: if (!isFeedback) {
    tip = "";
  }

  async function createChestionar() {
    const url = "/feedback/api/Chestionare";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nume: chestionarname,
        username: username,
        tip: tip,
      }),
    });
    if (response.ok) {
      tip = "";
      succes = true;
      isFeedback = false;
      chestionarname = "";
      idChestionar = "";
      setTimeout(() => {
        getListOfChestionar();
        addChestionar = false;
      }, 1000);
    }
  }
  //                          ==============                   editeaza chestionar            ==================
  let idChestionar = null;
  async function editNameOfChestionar() {
    if (idChestionar === null) {
    } else {
      const url = "/feedback/api/Chestionare/" + idChestionar;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nume: chestionarname,
          username: sessionStorage.getItem("username"),
          tip: tip,
        }),
      });
      if (response.ok) {
        getListOfChestionar();
        editchestionar = false;
        chestionarname = "";
      } else {
        editchestionar = false;
        permision = true;
        chestionarname = "";
      }
    }
  }
  //                         ==============                       sterge chestionar           ==================
  let deletedChestionar = false;
  async function deleteChestionar() {
    if (idChestionar === null) {
      errorondelete = true;
    } else {
      const url = "/feedback/api/Chestionare/" + idChestionar;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: sessionStorage.getItem("username"),
        }),
      });
      if (response.ok) {
        deletedChestionar = true;
        idChestionar = "";
        getListOfChestionar();
      } else {
        permision = true;
      }
    }
  }
  //                                                             CREAZA INTREBARE
  async function creaateQuestion() {
    if (questionName) {
      const url = "/feedback/api/Intrebari";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          denumireIntrebare: questionName,
          idChestionar: idChestionar,
        }),
      });
      if (response.ok) {
        getListOfQuestion();
        addQuestion = false;
      }
    }
  }
  //                                                             editeaza intrebare
  let questionaId;
  async function editQuestion() {
    const url = "/feedback/api/Intrebari/" + idquestion;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        denumireIntrebare: questionName,
        idChestionar: idChestionar,
      }),
    });
    getListOfQuestion();
  }
  //                                                              sterge intrebare

  async function deleteQuestion() {
    const url = "/feedback/api/Intrebari/" + idquestion;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getListOfQuestion();
  }
  //                                                               LISTA DE INTREBARI DUPA CHESTIONAR
  let error = false;
  let message;
  let questionList;
  $: if (forPerson) {
    getListOfQuestion();
  }
  async function getListOfQuestion() {
    responseforquestion = {};
    const url = "/feedback/api/Intrebari/" + idChestionar;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      questionList = data;
      error = false;
      questionName = "";

      if (questionList) {
        for (const element of questionList) {
          const c = feed === "feedback" && forPerson !== null;
          responseforquestion[element.id] = {
            questionId: element.id,
            idChestionar: idChestionar,
            raspuns: "",
            forPerson: c ? forPerson : "null",
            fromPerson: c ? "null" : sessionStorage.getItem("username"),
          };
        }
      }
    } else {
      error = true;
      message = data.message;
      questionList = "";
    }
  }

  ///                                                               lista de persoane dupa sectie
  let personList;
  async function getListOfPerson() {
    const url = "/security/getGroupMembers";
    const info = { GroupName: "Sectia Studii si Dezvoltare" };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    if (response.ok) {
      personList = data.User;
    }
  }
  ///////////////
  let restricted = false;
  let autofeedback = false;
  let inserted = false;
  //                                                             raspunde la intrebare
  async function responseToQuestion() {
    const a = [];
    for (const x in responseforquestion) {
      a.push(responseforquestion[x]);
    }

    const url = "/feedback/api/UserResponse";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(a),
    });
    if (response.ok) {
      inserted = true;
      complectedwithsucces = true;
      welcome = true;
    }
  }
  //"IP_172.22.4.168"
  let admin = ["Serghei Matcovschii", "Grigore Gavrilencu", "IP_172.22.4.168"];
  let acces = false;
  $: if (complectedwithsucces) {
    setTimeout(() => {
      complectedwithsucces = false;
    }, 2500);
  }
  $: if (succes) {
    addChestionar = false;
    editchestionar = false;
    setTimeout(() => {
      succes = false;
    }, 2000);
  }
  $: if (deletedChestionar) {
    setTimeout(() => {
      deletedChestionar = false;
    }, 2000);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if permision}
  <div class="all">
    <div class="restricted">
      <img
        src={close}
        alt=""
        class="closerestricted"
        on:click={() => {
          permision = false;
        }}
      />
      Nu aveți permisiunea de a modifica acest chestionar.
    </div>
  </div>
{/if}
{#if acces}
  <div class="all">
    <span class="acces">
      <img
        src={close}
        alt=""
        on:click={() => {
          acces = false;
        }}
        class="iconss"
      />
      Nu aveti acces la gestionarea Chestionarelor</span
    >
  </div>
{/if}
{#if complectedwithsucces}
  <div class="all">
    <div class="succesoncomplected">Salvat cu succes</div>
  </div>
{/if}
{#if errorondelete}
  <div class="all">
    <span class="infomessage">Nu ai selectat nici un chestionar</span>
    <img
      src={close}
      class="button"
      on:click={() => {
        errorondelete = false;
      }}
    />
  </div>
{/if}
{#if editchestionar}
  <div class="addChestionar">
    <div class="addq">
      <img
        src={close}
        alt=""
        on:click={() => {
          editchestionar = false;
        }}
        class="closequestionar"
      />
      {#if succes}
        <span class="succes">Chestionar creat cu succes</span>
      {/if}
      <span class="nameof">Editeaza chestionar</span>
      <input
        type="text"
        name=""
        class="inputname"
        bind:value={chestionarname}
        id=""
        placeholder={idChestionar}
      />
      <div class="duall">
        <input type="checkbox" on:change={feedback} class="select" />
        <span class="type">Chestionar de tip Feedback</span>
      </div>
      <button class="btn" on:click={editNameOfChestionar}>Salveaza</button>
    </div>
  </div>
{/if}
{#if addChestionar}
  <div class="addChestionar">
    <div class="addq">
      <img
        src={close}
        alt=""
        on:click={() => {
          addChestionar = false;
        }}
        class="closequestionar"
      />
      {#if succes}
        <span class="succes">Chestionar creat cu succes</span>
      {/if}
      <span class="nameof">Denumire chestionar</span>
      <input
        type="text"
        name=""
        class="inputname"
        bind:value={chestionarname}
        id=""
        placeholder="Example..."
      />
      <div class="duall">
        <input type="checkbox" on:change={feedback} class="select" />
        <span class="type">Chestionar de tip Feedback</span>
      </div>
      <button class="btn" on:click={createChestionar}>Salveaza</button>
    </div>
  </div>
{/if}
{#if showMenu}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="openMenu slide-in-left">
    <!--
    <div
      class="dual"
      on:click={() => {
        showMenu = false;
        view = true;
        complete = false;
        gestion = false;
        welcome = false;
        idChestionar = "";
        getChestionarList();
      }}
    >
      <img src={viz} alt="" class="ico" />
      <span class="list">Vizualizare feedbackuri completate </span>
    </div>
    -->
    <div
      class="dual"
      on:click={() => {
        showMenu = false;
        view = false;
        complete = true;
        idChestionar = "";
        welcome = false;
        gestion = false;
        forPerson = null;
        colegsfeed = null;
      }}
    >
      <img src={comp} alt="" class="ico" />
      <span class="list">Completare chestionar </span>
    </div>
    <div
      class="dual"
      on:click={() => {
        if (admin.includes(sessionStorage.getItem("username"))) {
          showMenu = false;
          view = false;
          complete = false;
          welcome = false;
          colegsfeed = null;
          forPerson = null;
          idChestionar = "";
          gestion = true;
          getListOfChestionar();
        } else {
          acces = true;
          showMenu = false;
          idChestionar = "";
        }
      }}
    >
      <img src={gest} alt="" class="ico" />
      <span class="list">Gestionare chestionare </span>
    </div>
    <div
      class="dual"
      on:click={() => {
        showMenu = false;
        view = false;
        complete = false;
        gestion = false;
        colegsfeed = null;
        welcome = false;
        allfeedback = true;
        forPerson = null;
        idChestionar = "";
        getChestionarFeedback();
      }}
    >
      <img src={viz} alt="" class="ico" />
      <span class="list">Feedbackul Colegilor</span>
    </div>
  </div>
{/if}
{#if addQuestion}
  <div class="addChestionar">
    <div class="adaugaintrebare">
      <img
        src={close}
        alt=""
        class="icon"
        on:click={() => {
          addQuestion = false;
        }}
      />
      <input
        type="text"
        name=""
        bind:value={questionName}
        id=""
        placeholder="Scrie intrebarea..."
        class="addquest"
      />
      <button class="salvequest" on:click={creaateQuestion}>Salveaza</button>
    </div>
  </div>
{/if}
{#if selectPerson}
  <div class="all">
    <div class="selectedPerson">
      <!-- {#if !restricted}
        <img
          src={close}
          alt=""
          class="closeico"
          on:click={() => {
            selectPerson = false;
          }}
        />
      {/if}
      -->
      <span class="selectt">Selectati o persoana</span>
      {#if personList}
        <select
          name=""
          id="selecct"
          style="outline: none;"
          on:change={() => {
            forPerson = event.target.value;
            if (forPerson !== sessionStorage.getItem("username")) {
              selectPerson = false;
              restricted = false;
              autofeedback = false;
            } else {
              autofeedback = true;
              restricted = true;
            }
          }}
        >
          <option value=""></option>
          <option value="IP_172.22.4.168">IP_172.22.4.168</option>
          {#each personList as list}
            <option value={list}>{list}</option>
          {/each}
        </select>
      {/if}
      {#if autofeedback}
        <span class="errorr"
          >Nu puteti da autofeedback,selectati alta persoana.</span
        >
      {/if}
    </div>
  </div>
{/if}
{#if succes}
  <div class="all">
    <div class="succesoncomplected">Salvat cu succes</div>
  </div>
{/if}
{#if deletedChestionar}
  <div class="all">
    <div class="succesoncomplected">
      Chestionar <span class="deleted">sters</span> cu succes
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
    <span class="username">{sessionStorage.getItem("username")}</span>
  </header>
  {#if welcome}
    <div class="app slide-in-fwd-bottom">
      <div class="info">Bun venit pe platforma de feedback OTP Bank</div>
    </div>
  {:else}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="area">
      {#if gestion}
        <div class="menuLeft slide-in-left">
          <div class="function">
            <div class="imaggroups">
              {#if expandadd}
                <div
                  class="double swing-in-right-fwd"
                  on:mouseleave={() => {
                    expandadd = false;
                    expandaddico = true;
                  }}
                  on:click={() => {
                    addChestionar = true;
                  }}
                >
                  <span class="name">Adauga</span>
                  <img src={addwhite} alt="" class="icons" />
                </div>
              {/if}
              {#if expandaddico}
                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                <img
                  src={add}
                  alt=""
                  on:mouseenter={() => {
                    expandadd = true;
                    expandaddico = false;
                  }}
                  class="icons"
                />
              {/if}
              {#if expanddelete}
                <div
                  class="double swing-in-right-fwd"
                  on:click={deleteChestionar}
                  on:mouseleave={() => {
                    expanddelete = false;
                    expanddeleteico = true;
                  }}
                >
                  <span class="name">Sterge</span>
                  <img src={delet} alt="" class="icons" />
                </div>
              {/if}
              {#if expanddeleteico}
                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                <img
                  src={deletegray}
                  on:mouseenter={() => {
                    expanddelete = true;
                    expanddeleteico = false;
                  }}
                  alt=""
                  class="icons iconsDelete"
                />
              {/if}
              {#if expandrename}
                <div
                  class="double swing-in-right-fwd"
                  on:mouseleave={() => {
                    expandrename = false;
                    expandrenameico = true;
                  }}
                  on:click={() => {
                    if (idChestionar === null) {
                      errorondelete = true;
                    } else {
                      editchestionar = true;
                    }
                  }}
                >
                  <span class="name">Redenumeste</span>
                  <img src={delet} alt="" class="icons" />
                </div>
              {/if}
              {#if expandrenameico}
                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                <img
                  src={rename}
                  alt=""
                  on:mouseenter={() => {
                    expandrename = true;
                    expandrenameico = false;
                  }}
                  class="icons"
                />
              {/if}
            </div>
          </div>
          <div class="block">
            <div class="dual">
              <img src={gest} alt="" class="ico" />
              <span class="lista">Lista de chestionare </span>
            </div>

            <img src={arr} alt="" class="icon" />
          </div>

          {#if listofchestionar}
            {#each listofchestionar as chestionar}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span
                class="listof"
                class:active={chestionar.id === idChestionar}
                on:click={() => {
                  idChestionar = chestionar.id;
                  setTimeout(() => {
                    getListOfQuestion();
                  }, 100);
                }}
              >
                {chestionar.nume}
              </span>
            {/each}
          {/if}
        </div>
        {#if idChestionar}
          <div class="menuright slide-in-fwd-right">
            <div class="infoadd">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                class="doublle swing-in-right-fwd"
                on:click={() => {
                  addQuestion = true;
                }}
              >
                <span class="name">Adauga intrebare</span>
                <img src={addwhite} alt="" class="icons" />
              </div>
            </div>
            {#if error}
              <div class="mesinfo">
                Nu există întrebări pentru chestionarul specificat.
              </div>
            {/if}
            <div class="listadeintrebari">
              {#if questionList}
                {#each questionList as list}
                  <div
                    class="intrebaregestion"
                    on:mouseenter={() => {
                      idquestion = list.id;
                      removeQ = true;
                      editQ = true;
                    }}
                    on:mouseleave={() => {
                      removeQ = false;
                      editQ = false;
                      editquestion = true;
                      questionName = "";
                    }}
                  >
                    <span class="intrebare">{list.denumireIntrebare}</span>
                    {#if !editquestion && idquestion === list.id}
                      <input
                        type="text"
                        class="editintrebare"
                        disabled={editquestion && idquestion === list.id}
                        bind:value={questionName}
                        placeholder="Example..."
                      />
                    {/if}
                    {#if multiquestion && idquestion === list.id}
                      {#each listt as item, index (Object.keys(item)[0])}
                        <div class="rind">
                          <div class="dualmulti">
                            <input
                              type="text"
                              required
                              class="adauga"
                              placeholder="Exemplu intrebare..."
                              bind:value={item[Object.keys(item)[0]]}
                              on:input={(event) => upadateValue(index, event)}
                            />
                            <button
                              class="deleteitem"
                              on:click={() => deleteInput(Object.keys(item)[0])}
                              >Șterge</button
                            >
                          </div>
                        </div>
                      {/each}
                    {/if}
                    {#if !editquestion && idquestion == list.id}
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <div class="salveaza" on:click={editQuestion}>
                        Salvare
                      </div>
                    {/if}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="questionGestion">
                      {#if removeQ && idquestion == list.id}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                          class="doublle swing-in-right-fwd"
                          on:click={() => {
                            deleteQuestion();
                          }}
                        >
                          <span class="name">Sterge</span>
                          <img src={addwhite} alt="" class="icons" />
                        </div>
                      {/if}

                      {#if editQ && idquestion == list.id}
                        <div
                          class="doublle swing-in-right-fwd"
                          on:click={() => {
                            editquestion = !editquestion;
                          }}
                        >
                          <span class="name">Modifica</span>
                          <img src={addwhite} alt="" class="icons" />
                        </div>
                      {/if}
                      {#if editQ && idquestion == list.id}
                        <div
                          class="doublle swing-in-right-fwd"
                          on:click={() => {
                            addInput();
                            multiquestion = true;
                          }}
                        >
                          <span class="name">Subintrebari</span>
                          <img src={addwhite} alt="" class="icons" />
                        </div>
                      {/if}
                    </div>
                  </div>
                {/each}
              {/if}
            </div>
          </div>
        {:else}
          <div class="infocenter">
            <div class="info">
              Selectați chestionarul sau creati unul pentru a începe
            </div>
          </div>
        {/if}
      {:else if view}
        <div class="menuLeft slide-in-left">
          <div class="block">
            <div class="dual">
              <img src={gest} alt="" class="ico" />
              <span class="lista">Lista de chestionare </span>
            </div>
            <img src={arr} alt="" class="icon" />
          </div>
          {#if chlist}
            {#each chlist as list}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span
                class="listof"
                class:active={list.id === idChestionar}
                on:click={() => {
                  idChestionar = list.id;
                  setTimeout(() => {
                    getChestionarList();
                  }, 100);
                }}
              >
                {list.nume}
              </span>
            {/each}
          {/if}
        </div>
        {#if chlist}
          <div class="menuright slide-in-fwd-right">
            {#if complected}
              <div class="allquestions">
                {#each complected as response}
                  <div class="questions">
                    <span class="intrebarre"
                      ><span class="green">
                        Intrebare:</span
                      >{response.denumireIntrebare}</span
                    >
                    <span class="resp"
                      ><span class="green">
                        Raspuns:</span
                      >{response.raspuns}</span
                    >
                  </div>
                {/each}
              </div>
            {:else}
              <div class="mesinfo">
                Nu există întrebări pentru chestionarul specificat.
              </div>
            {/if}
          </div>
        {:else}
          <div class="infocenter">
            <div class="info">Selectați chestionarul pentru a începe</div>
          </div>
        {/if}
      {:else if complete}
        <div class="menuLeft slide-in-left">
          <div class="block">
            <div class="dual">
              <img src={gest} alt="" class="ico" />
              <span class="lista">Lista de chestionare </span>
            </div>
            <img src={arr} alt="" class="icon" />
          </div>
          {#if listofchestionar}
            {#each listofchestionar as chestionar}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span
                class="listof"
                class:active={chestionar.id === idChestionar}
                on:click={() => {
                  idChestionar = chestionar.id;
                  feed = chestionar.tip;
                  if (feed == "feedback") {
                    forPerson = null;
                    selectPerson = true;
                  }
                  setTimeout(() => {
                    getListOfQuestion();
                  }, 100);
                }}
              >
                {chestionar.nume}
              </span>
            {/each}
          {/if}
        </div>
        {#if idChestionar}
          <div class="menuright slide-in-fwd-right">
            {#if feed == "feedback"}
              {#if forPerson}
                <span class="nameofperson">Feedback pentru : {forPerson}</span>
              {/if}
            {/if}
            {#if questionList}
              <form
                class="allquestions"
                on:submit|preventDefault={responseToQuestion}
              >
                {#each questionList as question}
                  <div class="questions">
                    <span class="intrebarre">{question.denumireIntrebare}</span>
                    {#if responseforquestion[question.id]}
                      <input
                        type="text"
                        bind:value={responseforquestion[question.id].raspuns}
                        placeholder="Raspuns..."
                        required
                        class="responsequestions"
                      />
                    {/if}
                  </div>
                {/each}
                <button class="sendresponse" type="submit"
                  >Trimite Raspuns</button
                >
              </form>
            {:else}
              <div class="mesinfo">
                Nu există întrebări pentru chestionarul specificat.
              </div>
            {/if}
          </div>
        {:else}
          <div class="infocenter">
            <div class="info">Selectați chestionarul pentru a începe</div>
          </div>
        {/if}
      {:else if allfeedback}
        <div class="menuLeft slide-in-left">
          <div class="block">
            <div class="dual">
              <img src={gest} alt="" class="ico" />
              <span class="lista">Lista de chestionare </span>
            </div>
            <img src={arr} alt="" class="icon" />
          </div>
          {#if feedbackonly}
            {#each feedbackonly as feed}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span
                class="listof"
                class:active={feed.id === idChestionar}
                on:click={() => {
                  idChestionar = feed.id;

                  setTimeout(() => {
                    getFeedbackColegs();
                  }, 100);
                }}
              >
                {feed.nume}
              </span>
            {/each}
          {/if}
        </div>
        {#if colegsfeed}
          <div class="menuright slide-in-fwd-right">
            <span class="totalizare">Lista de feedbackuri a fiecarui coleg</span
            >
            <div class="colegsfeedback">
              {#each colegsfeed as resp, index}
                <div class="colegsblock">
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <span
                    class="nameofcolegs"
                    on:click={() => {
                      toggleDetails(index);
                    }}
                    >{resp.forPerson}
                    {#if showDetails[index]}
                      <img src={arr} alt="" class="arr" />
                    {:else}
                      <img src={jos} alt="" class="arrr" />
                    {/if}</span
                  >
                  {#if showDetails[index]}
                    {#each resp.intrebariSiRaspunsuri as raspunsuri}
                      <span class="questionresponse">
                        <span class="intreb"
                          ><span class="green">Intrebare:</span
                          >{raspunsuri.intrebare}</span
                        >
                        <span class="raspunsul"
                          ><span class="green">Raspuns:</span
                          >{raspunsuri.raspuns}</span
                        >
                      </span>
                    {/each}
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {:else if emptydata}
          <div class="infocenter slide-in-fwd-right">
            <div class="info">Nu exista raspunsuri pentru chestionarul dat</div>
          </div>
        {:else}
          <div class="infocenter slide-in-fwd-right">
            <div class="info">Selectați chestionarul pentru a începe</div>
          </div>
        {/if}
      {/if}
    </div>
  {/if}
</main>

<style>
  .deleteitem {
    padding-inline: 5px;
    height: 25px;
    border: none;
    border-radius: 6px;
    background-color: #52ae30;
    color: white;
    border: 1px solid #52ae30;
    margin-left: 5px;
  }
  .adauga {
    width: 100%;
    outline: none;
    height: 30px;
    padding-inline: 10px;
    border-radius: 10px;
    border: none;
  }
  .dualmulti {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-block: 10px;
    border-bottom: 1px solid #52ae30;
  }
  .rind {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: start;
  }
  .multiplequestion {
    width: 800px;
    height: 500px;
    background-color: white;
    border-radius: 20px;
  }
  .deleted {
    color: red;
  }
  .editintrebare {
    width: 100%;
    margin-top: 20px;
    border: none;
    height: 35px;
    padding-inline: 10px;
    border-radius: 15px;
    outline: none;
    border-bottom: 1px solid #52ae30;
  }
  .succesoncomplected {
    background-color: white;
    padding: 50px;
    border-radius: 20px;
    color: #52ae30;
  }
  * {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
  .arrr {
    width: 20px;
    height: 10px;
  }
  .totalizare {
    width: 100%;
    text-align: center;
    font-size: 20px;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  .nameofcolegs {
    font-size: 18px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .questionresponse {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    background-color: #ffffff;
    margin-block: 5px;
    border-radius: 10px;
    padding: 5px;
  }
  .colegsblock {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f1f1f1;
    margin-block: 6px;
    padding: 5px;
    border-radius: 10px;
  }
  .colegsfeedback {
    width: 100%;
    overflow: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .acces {
    background-color: white;
    padding: 50px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .iconss {
    width: 30px;
    position: fixed;
    margin-left: 380px;
    margin-bottom: 90px;
    cursor: pointer;
  }
  .green {
    color: #52ae30;
  }
  .allquestions {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding-block: 10px;
  }
  .sendresponse {
    width: 150px;
    cursor: pointer;
    border: none;
    padding-block: 5px;
    border-radius: 20px;
    background-color: #52ae30;
    color: white;
  }
  .responsequestions {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid #52ae30;
    padding: 5px;
    border-radius: 5px;
    margin-top: 5px;
  }
  .intrebarre {
    width: 100%;
  }
  .questions {
    padding: 10px;
    border-radius: 20px;
    background-color: #f1f1f1;
    width: 100%;

    display: flex;
    margin-block: 5px;
    flex-direction: column;
    align-items: start;
  }
  * {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
  .nameofperson {
    font-weight: 600;
    margin-top: 20px;
  }
  #selecct {
    padding: 10px;
    border-radius: 20px;
    background-color: #52ae30;
    border: none;
    width: 200px;
    color: white;
    margin-bottom: 20px;
  }
  .errorr {
    color: red;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
  .selectt {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    margin-bottom: 20px;
  }
  .closeico {
    position: fixed;
    width: 30px;
    margin-left: 410px;
    cursor: pointer;
    margin-bottom: 160px;
  }
  .selectedPerson {
    width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    justify-content: center;
    height: 200px;
    background-color: white;
  }
  .listadeintrebari {
    width: 100%;
    overflow: auto;
    height: 90%;
  }
  .salvequest {
    background-color: #52ae30;
    border: 1px solid #52ae30;
    padding: 5px;
    border-radius: 20px;
    cursor: pointer;
    padding-inline: 10px;
    color: white;
  }
  .addquest {
    width: 90%;
    border-radius: 20px;
    border: 1px solid #52ae30;
    outline: none;
    height: 25px;
    padding-inline: 10px;
    margin-bottom: 20px;
  }
  .icon {
    cursor: pointer;
    width: 30px;
    position: fixed;
    margin-left: 550px;
    margin-bottom: 70px;
  }
  .adaugaintrebare {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    background-color: white;
    padding: 20px;
    border-radius: 20px;
    width: 600px;
  }
  .salveaza {
    background-color: #52ae30;
    color: white;
    margin-top: 10px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    position: fixed;
    cursor: pointer;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;

    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  .intrebare {
    border: 1px solid #52ae30;
    padding: 5px;
    width: 100%;

    outline: none;
    border-radius: 20px;
  }
  .intrebare::placeholder {
    color: rgb(54, 54, 54);
    opacity: 1; /* Firefox */
  }
  .intrebaregestion {
    width: 100%;
    background-color: #f1f1f1c0;
    padding: 10px;
    display: flex;
    border-radius: 20px;
    flex-direction: column;
    justify-content: center;
    margin-block: 10px;
    align-items: end;
  }
  .infoadd {
    width: 100%;
    justify-content: end;
    display: flex;
    padding: 20px;
  }
  .doublle {
    width: 180px;
    background-color: #52ae30;
    border-radius: 20px;
    display: flex;
    align-items: center;
    height: 30px;
    cursor: pointer;
    margin-right: 10px;
  }
  .questionGestion {
    display: flex;
    align-items: center;
    height: 40px;
    justify-content: end;
  }
  .duall {
    display: flex;
    align-items: center;
  }
  .closerestricted {
    width: 25px;
    position: fixed;
    cursor: pointer;
    margin-left: 455px;
    margin-bottom: 90px;
  }
  .restricted {
    display: flex;
    align-items: center;
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    font-size: 20px;
    padding-block: 50px;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
  .button {
    margin-bottom: 30px;
    margin-left: 280px;
    width: 25px;
    position: fixed;
    cursor: pointer;
  }
  .infomessage {
    text-align: center;
    width: 320px;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    padding: 20px;
    border-radius: 20px;
    background-color: white;
  }
  .all {
    width: 100%;
    height: 100vh;
    position: fixed;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 2;
    background-color: rgba(164, 164, 164, 0.671);
  }
  .btn {
    background-color: #52ae30;
    border: none;
    color: white;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  .select {
    width: 15px;
    height: 15px;
  }
  .type {
    margin-left: 5px;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }

  .inputname {
    width: 80%;
    border: none;
    font-size: 18px;
    outline: none;
    border-bottom: 1px solid;
  }
  .nameof {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    font-size: 18px;
    margin-bottom: 15px;
  }
  .addChestionar {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    z-index: 2;
    background-color: rgba(197, 197, 197, 0.805);
  }
  .addq {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 500px;
    height: 160px;
    padding: 15px;
    background-color: white;
    border-radius: 20px;
  }
  .closequestionar {
    cursor: pointer;
    width: 30px;
    position: absolute;
    margin-bottom: 120px;
    margin-left: 465px;
  }
  .close {
    position: fixed;
    margin-left: 360px;
    margin-bottom: 50px;
    width: 30px;
    cursor: pointer;
  }
  .mesinfo {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    background-color: white;
    width: 400px;
    height: 80px;
    display: flex;

    align-items: center;
    justify-content: center;
    border-radius: 20px;
  }
  .message {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    border-radius: 20px;
    justify-content: center;
    z-index: 2;
    background-color: rgba(197, 197, 197, 0.853);
  }
  .infocenter {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  @-webkit-keyframes swing-in-right-fwd {
    0% {
      -webkit-transform: rotateY(-100deg);
      transform: rotateY(-100deg);
      -webkit-transform-origin: right;
      transform-origin: right;
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateY(0);
      transform: rotateY(0);
      -webkit-transform-origin: right;
      transform-origin: right;
      opacity: 1;
    }
  }
  @keyframes swing-in-right-fwd {
    0% {
      -webkit-transform: rotateY(-100deg);
      transform: rotateY(-100deg);
      -webkit-transform-origin: right;
      transform-origin: right;
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateY(0);
      transform: rotateY(0);
      -webkit-transform-origin: right;
      transform-origin: right;
      opacity: 1;
    }
  }
  .swing-in-right-fwd {
    -webkit-animation: swing-in-right-fwd 0.5s
      cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
    animation: swing-in-right-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
      both;
  }
  * {
    transition: 0.5s;
  }
  .iconsDelete:hover {
    display: none;
  }

  .name {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    color: white;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 82%;
    border-right: 1px solid white;
  }
  .imaggroups {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .double {
    cursor: pointer;
    width: 100%;
    background-color: #52ae30;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    padding-inline: 10px;
    height: 30px;
    transition: 0.5s;
  }
  .icons {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-inline: 5px;
  }
  .function {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-inline: 20px;
  }
  .lista {
    font-weight: 600;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
  .listof {
    cursor: pointer;
    margin-left: 10%;
    width: 100%;
    border-left: 1px solid;
    padding-left: 8px;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    margin-block: 2px;
    color: #848485;
  }

  .block {
    display: flex;
    padding-inline: 10px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .menuright {
    display: flex;

    flex-direction: column;
    flex-grow: 1;
    height: 95%;
    padding-inline: 20px;
    border-radius: 20px;
    background-color: rgb(255, 255, 255);
  }
  .menuLeft {
    padding-block: 20px;
    width: 320px;
    display: flex;
    flex-direction: column;
    height: 95%;
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    margin-right: 20px;
  }
  .area {
    width: 100%;
    display: flex;
    height: 60%;
    flex-grow: 0.9;
    border-radius: 30px;
  }
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
  }
  .ico {
    width: 40px;
    margin-right: 5px;
  }
  .openMenu {
    position: fixed;
    width: 300px;
    margin-top: 200px;
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
    height: 54px !important;
    background-color: white;
    border-radius: 40px;
    margin-bottom: 30px;
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
  @media only screen and (max-width: 1600px) {
    .openMenu {
      width: 305px;
      height: 40%;
    }
  }

  @media only screen and (max-width: 1990px) {
  }

  .active {
    color: #52ae30;
    margin-left: 12%;
  }
</style>
