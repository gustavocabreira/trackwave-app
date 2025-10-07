import { ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types/user";
import { userService } from "@/services/userService";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();

  const user = ref<User | null>(null);

  function setUser(next: User | null) {
    user.value = next;
  }

  function getUser(): User | null {
    return user.value ?? null;
  }

  function clearUser() {
    user.value = null;
  }

  async function fetchUser() {
    const res = await userService.getCurrentUser();

    if (res?.errors?.message === "The email has not been verified yet.") {
      router.push({
        name: "EmailVerificationIndex",
        query: { status: "pending" },
      });
    }

    if (res.ok && res.data) {
      setUser(res.data);
    } else {
      setUser(null);
    }

    return res;
  }

  return {
    // state
    user,

    // actions
    setUser,
    getUser,
    clearUser,
    fetchUser,
  };
});
