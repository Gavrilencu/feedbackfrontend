// place files you want to import through the `$lib` alias in this folder.
/////////------------Auth
import { goto } from "$app/navigation";
export async function Autentification() {
  let url = "/security/kerberos-login";
  if (import.meta.env.PROD === true) {
    url = "/security/kerberos-login";
  } else {
    url = "/security/developerIP-login";
  }
  let response = await fetch(url);
  const data = await response.json();
  if (response.ok) {
    sessionStorage.setItem("username", data.DisplayName);
    setTimeout(() => {
      goto("/feedback/home");
    }, 2000);
  } else {
    console.log("Error autentification");
  }
}

//auth
export async function Auth() {
  let url = "/security/kerberos-login";
  if (import.meta.env.PROD === true) {
    url = "/security/kerberos-login";
  } else {
    url = "/security/developerIP-login";
  }
  let response = await fetch(url);
  const data = await response.json();
  if (response.ok) {
    sessionStorage.setItem("username", data.DisplayName);
  }
}
