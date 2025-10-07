import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useUserStore } from "@/stores/userStore";

const router = createRouter({ history: createWebHistory(), routes });

async function init() {
  const userStore = useUserStore();

  const res = await userStore.fetchUser();

  if (res?.errors?.message === "The email has not been verified yet.") {
    router.push({
      name: "EmailVerificationIndex",
      query: { status: "pending" },
    });
  }
}

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const requiresAuth = to.meta.requiresAuth;

  if (userStore.getUser() && !requiresAuth) {
    return { name: "Index" };
  }

  if (!userStore.getUser() && requiresAuth) {
    return { name: "LoginIndex" };
  }

  return true;
});

export default router;
