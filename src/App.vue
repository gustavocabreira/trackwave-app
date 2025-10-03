<template>
  <router-view />
  <Toaster rich-colors :closeButton="true" close-button-position="top-right" position="top-right" />
</template>

<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";
</script>
