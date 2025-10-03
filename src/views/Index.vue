<template>
  <div>
    <h1>Welcome, {{ userStore.getUser()?.name }}!</h1>
    <button class="bg-blue-500 text-white px-4 py-2 rounded-md" @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { authService } from "@/services/auth/authService";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

const logout = async () => {
  const res = await authService.logout();

  if (!res.ok) {
    return;
  }

  router.push({
    name: "LoginIndex",
  });
};
</script>
