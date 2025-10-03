import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useUserStore } from "@/stores/userStore";
import { userService } from "@/services/userService";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const requiresAuth = to.meta.requiresAuth;

  if (!userStore.getUser() && requiresAuth) {
    const res = await userService.getCurrentUser();

    if (res.ok && res.data) {
      userStore.setUser(res.data);
    } else {
      userStore.clearUser();
      return { name: "LoginIndex" };
    }
  }

  const user = userStore.getUser();

  if (user && !requiresAuth) {
    return { name: "Index" };
  }

  if (!user && requiresAuth) {
    return { name: "LoginIndex" };
  }

  return true;
});

export default router;
