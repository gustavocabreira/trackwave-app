import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useUserStore } from "@/stores/userStore";

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const requiresAuth = to.meta.requiresAuth;
  const authRoutes = ["LoginIndex", "RegisterIndex", "EmailVerificationIndex"];

  if (userStore.getUser() && authRoutes.includes(to.name as string)) {
    return { name: "Index" };
  }

  if (!userStore.getUser() && requiresAuth) {
    return { name: "LoginIndex" };
  }

  return true;
});

export default router;
