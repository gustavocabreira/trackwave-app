<template>
  <SidebarProvider>
    <AppSidebar :organizations="organizations" :user="user" />
    <main>
      <SidebarTrigger />
      <router-view />
    </main>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/AppSidebar.vue";
import { User } from "@/types/user";

const userStore = useUserStore();
const user = ref<User>(userStore.getUser());

const organizations = [
  {
    name: "My Personal Organization",
  },
  {
    name: "Organization 2",
  },
  {
    name: "Organization 3",
  },
];
</script>
