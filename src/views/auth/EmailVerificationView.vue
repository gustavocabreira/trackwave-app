<template>
  <section v-if="status === 'success'" class="text-center space-y-4 w-md">
    <h1 class="text-3xl font-medium">Bem-vindo!</h1>
    <p>Seu e-mail foi verificado com sucesso, e agora você pode começar a usar a plataforma.</p>

    <Button class="w-full" @click="router.push({ name: 'LoginIndex' })">Ir para o login</Button>
  </section>
  <section v-else class="text-center space-y-4 w-md">
    <h1 class="text-3xl font-medium">Código de verificação expirado</h1>
    <p>O código de verificação expirou. Por favor, solicite um novo código para continuar.</p>

    <Button @click="resendToken" class="w-full">Reenviar código</Button>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { userService } from "@/services/userService";
import { Button } from "@/components/ui/button";
import { toast } from "vue-sonner";

type Status = "success" | "expired";

const route = useRoute();
const router = useRouter();

const token = route.query?.token as string;
const status = ref<Status>("expired");

const resendToken = async () => {
  if (!token) return;

  const res = await userService.refreshVerificationToken(token);

  if (res.ok) {
    toast.success("E-mail reenviado", {
      description: "Verifique sua caixa de entrada para encontrar o novo link de verificação.",
    });
  }

  if (!res.ok) {
    if (res.errors?.message) {
      toast.error("Erro", {
        description: res.errors?.message,
      });
    }
  }
};

onMounted(async () => {
  if (!token) {
    router.push({ name: "LoginIndex" });

    return;
  }

  const res = await userService.verifyEmail(token);

  if (!res.ok) {
    if (res.errors?.message && res.status !== 422) {
      toast.error("Erro", {
        description: res.errors?.message,
      });
    }

    if (res.status === 422) {
      status.value = "expired";
    }

    return;
  } else {
    status.value = "success";
  }
});
</script>

<style scoped></style>
