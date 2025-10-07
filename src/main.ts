import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { useUserStore } from "./stores/userStore";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App).use(router).use(pinia);

async function init() {
  const userStore = useUserStore();

  await userStore.fetchUser();

  app.mount("#app");
}

init();
