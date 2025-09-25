<template>
    <div>App Layout</div>
    <router-view/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import http from '@/services/http';

onMounted(() => {
    http.get('me')
})
</script>