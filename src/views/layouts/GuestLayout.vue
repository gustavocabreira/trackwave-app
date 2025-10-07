<template>
  <div class="flex items-center justify-center h-screen">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  // if (userStore.getUser()) {
  //   router.push({ name: "Index" });
  // }
});
</script>

<style lang="scss"></style>
