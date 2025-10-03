import { ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/types/user";

export const useUserStore = defineStore("user", () => {
  const user = ref<User>();

  function setUser(next: User) {
    user.value = next;
  }

  function getUser(): User | null {
    return user.value ?? null;
  }

  function clearUser() {
    user.value = null;
  }

  return {
    // state
    user,

    // actions
    setUser,
    getUser,
    clearUser,
  };
});
