<template>
  <section v-if="status === 'pending'" class="text-center space-y-4 w-md">
    <h1 class="text-3xl font-medium">Verify your e-mail</h1>

    <p>Check your e-mail inbox to see the verification link. Click on the button to verify your account.</p>
    <p>Didn't receive the e-mail?</p>
    <Button class="w-full" :disabled="countdown > 0" @click="resendEmail">
      <template v-if="countdown > 0"> Resend e-mail in {{ countdown }}s </template>
      <template v-else> Resend e-mail </template>
    </Button>
  </section>
  <section v-else-if="status === 'success'" class="text-center space-y-4 w-md">
    <h1 class="text-3xl font-medium">Welcome!</h1>
    <p>Your account has been successfully verified, you can now log in.</p>

    <Button class="w-full" @click="startOnboarding">Start onboarding</Button>
    <a class="underline text-sm cursor-pointer" @click="authService.logout()">Logout</a>
  </section>
  <section v-else class="text-center space-y-4 w-md">
    <h1 class="text-3xl font-medium">Verification link expired</h1>
    <p>The verification link has expired. Please request a new one before continuing.</p>

    <Button @click="resendToken" class="w-full">Resend e-mail</Button>
    <Button class="w-full" :disabled="countdown > 0" @click="resendToken">
      <template v-if="countdown > 0"> Resend e-mail in {{ countdown }}s </template>
      <template v-else> Resend e-mail </template>
    </Button>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { userService } from "@/services/userService";
import { Button } from "@/components/ui/button";
import { toast } from "vue-sonner";
import { authService } from "@/services/auth/authService";
import { useUserStore } from "@/stores/userStore";

type Status = "pending" | "success" | "expired";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const token = route.query?.token as string;
const status = ref<Status>((route.query?.status as Status) || "pending");
const countdown = ref(0);
let interval: ReturnType<typeof setInterval> | null = null;

function setStatus(value: Status) {
  status.value = value;
}

function startCountdown() {
  countdown.value = 60;

  interval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0 && interval) {
      clearInterval(interval);
      interval = null;
    }
  }, 1000);
}

function stopCountdown() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

async function resendToken() {
  if (!token || countdown.value > 0) return;

  stopCountdown();

  const res = await userService.refreshVerificationToken(token);

  if (res.ok) {
    toast.success("Success", {
      description: "Check your e-mail inbox to find the new verification link.",
    });
  } else {
    toast.error("Error", {
      description: res.errors?.message || "An unexpected error occurred.",
    });
    return;
  }

  setStatus("pending");

  startCountdown();
}

async function resendEmail() {
  if (countdown.value > 0) return;

  stopCountdown();

  await userService.resendVerificationEmail();

  startCountdown();

  setStatus("pending");
}

async function startOnboarding() {
  const res = await userStore.fetchUser();

  if (res.ok) {
    router.push({ name: "Index" });
  }
}

onMounted(async () => {
  if (token) {
    const res = await userService.verifyEmail(token);

    if (!res.ok) {
      if (res.errors?.message && res.status !== 422) {
        toast.error("Error", {
          description: res.errors?.message,
        });
      }

      if (res.status === 422) {
        setStatus("expired");
      }

      return;
    } else {
      setStatus("success");
    }
  }
});

onUnmounted(() => {
  stopCountdown();
});
</script>

<style scoped></style>
