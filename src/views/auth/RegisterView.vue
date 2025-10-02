<template>
  <section v-if="verifyEmail" class="text-center space-y-4 w-md">
    <h1 class="text-3xl font-medium">Verifique seu e-mail</h1>
    <div>
      <p>
        Enviamos um e-mail de verificação para <b>{{ form.email }} </b>.
      </p>
      <p>Clique no link no e-mail para verificar sua conta.</p>
    </div>
  </section>
  <section v-else>
    <form @submit.prevent="onSubmit" class="space-y-4 w-md text-start">
      <div class="flex flex-col gap-2">
        <label class="text-lg font-bold" for="name">Name</label>
        <input v-model="form.name" id="name" name="name" type="text" placeholder="Name" class="w-full rounded-md border-2 border-gray-300 p-2" />
        <span v-if="errors?.name" class="text-sm text-red-400">{{ errors.name.join(", ") }}</span>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-lg font-bold" for="email">Email</label>
        <input v-model="form.email" id="email" name="email" type="email" placeholder="Email" class="w-full rounded-md border-2 border-gray-300 p-2" />
        <span v-if="errors?.email" class="text-sm text-red-400">{{ errors.email.join(", ") }}</span>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-lg font-bold" for="password">Password</label>
        <input v-model="form.password" id="password" name="password" type="password" placeholder="Password" class="w-full rounded-md border-2 border-gray-300 p-2" />
        <span v-if="errors?.password" class="text-sm text-red-400">{{ errors.password.join(", ") }}</span>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-lg font-bold" for="password_confirmation">Password Confirmation</label>
        <input v-model="form.password_confirmation" id="password_confirmation" name="password_confirmation" type="password" placeholder="Password Confirmation" class="w-full rounded-md border-2 border-gray-300 p-2" />
        <span v-if="errors?.password_confirmation" class="text-sm text-red-400">{{ errors.password_confirmation.join(", ") }}</span>
      </div>
      <button class="w-full rounded-md bg-blue-500 py-2 px-4 text-white" type="submit">Register</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { UserRegistration } from "@/services/auth/authService";
import { authService } from "@/services/auth/authService";

const router = useRouter();

const form = ref<UserRegistration>({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const verifyEmail = ref(false);
const errors = ref<any>(null);

const onSubmit = async () => {
  const res = await authService.register(form.value);

  if (!res.ok) {
    if (res.errors) {
      errors.value = res.errors.errors ?? null;
    }

    return;
  }

  verifyEmail.value = true;
};
</script>
