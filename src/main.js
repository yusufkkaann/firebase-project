import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Header from "./components/header/Header.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/configs";

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.component("Header", Header);
    app.mount("#app");
  }
});
