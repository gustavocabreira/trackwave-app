import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { useUserStore } from "./stores/userStore";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App).use(pinia);

async function init() {
  const userStore = useUserStore();

  const res = await userStore.fetchUser();

  app.use(router);

  if (res.status === 401 && window.location.pathname.includes("/verify-email")) {
    router.push({
      name: "LoginIndex",
    });
  }

  if (res?.errors?.message === "The email has not been verified yet.") {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    if (token) {
      router.push({
        name: "EmailVerificationIndex",
        query: { token },
      });
    } else {
      router.push({
        name: "EmailVerificationIndex",
      });
    }
  }

  app.mount("#app");
}

init();
