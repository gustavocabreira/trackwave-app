<template>
  <section v-if="status === 'pending'" class="text-center space-y-4 w-md">
    <h1 class="text-3xl font-medium">Verify your e-mail</h1>

    <p>Verify your inbox to find the verification link. Click on the link to verify your account.</p>
    <p>Didn't receive the e-mail?</p>
    <Button @click="resendToken" class="w-full">Resend e-mail</Button>
  </section>
  <section v-else-if="status === 'success'" class="text-center space-y-4 w-md">
    <h1 class="text-3xl font-medium">Welcome!</h1>
    <p>Your account has been successfully verified, you can now log in.</p>

    <Button class="w-full" @click="router.push({ name: 'Index' })">Start onboarding</Button>
  </section>
  <section v-else class="text-center space-y-4 w-md">
    <h1 class="text-3xl font-medium">Verification link expired</h1>
    <p>The verification link has expired. Please request a new one before continuing.</p>

    <Button @click="resendToken" class="w-full">Resend e-mail</Button>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { userService } from "@/services/userService";
import { Button } from "@/components/ui/button";
import { toast } from "vue-sonner";

type Status = "pending" | "success" | "expired";

const route = useRoute();
const router = useRouter();

const token = route.query?.token as string;
const status = ref<Status>((route.query?.status as Status) || "pending");

const setQueryStatus = () => {
  router.replace({
    query: {
      status: status.value,
    },
  });
};

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
  if (!token && !route.query?.status) {
    router.push({
      name: "LoginIndex",
    });

    return;
  }

  if (token) {
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

    setQueryStatus();
  }
});
</script>

<style scoped></style>
