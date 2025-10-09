<template>
  <SidebarProvider>
    <AppSidebar />
    <main>
      <SidebarTrigger />
      <router-view />
    </main>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/AppSidebar.vue";
</script>
