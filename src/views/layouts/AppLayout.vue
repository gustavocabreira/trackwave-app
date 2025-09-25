<template>
  <div>App Layout</div>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import http from "@/services/http";

import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

onMounted(async () => {
  const res = await http.get("me");

  if (!res.ok) {
    console.log(res.error);
  }

  userStore.setUser(res.data);
});
</script>
