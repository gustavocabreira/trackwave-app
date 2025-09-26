<template>
  <div>App Layout</div>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useUserStore } from "@/stores/userStore";
import { userService } from "@/services/userService";

const userStore = useUserStore();

onMounted(async () => {
  const res = await userService.getCurrentUser();

  console.log('res', res);

  if (!res.ok) {
    console.log(res.errors);
  }

  if(!res.data) {
    return;
  }

  userStore.setUser(res.data);
});
</script>
