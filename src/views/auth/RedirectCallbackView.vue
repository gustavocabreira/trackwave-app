<template>
  <div>
    <p>Autenticando...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();

onMounted(async () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (token) {
    const userStore = useUserStore()
    userStore.setUser({ access_token: token });

    router.push({ name: 'Index' });
  } else {
    console.error('Falha na autenticação: Nenhum token foi fornecido.');
    router.push({ name: 'LoginIndex' });
  }
});
</script>