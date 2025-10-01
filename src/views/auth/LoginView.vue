<template>
  <section class="space-y-8 text-center">
    <img src="/temporary_logo.png" alt="Logo" class="w-24 h-16 mx-auto" />

    <h2 class="text-3xl font-medium">Entrar</h2>

    <form @submit.prevent="onSubmit" class="space-y-4 w-md text-start">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>E-mail</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Insira seu e-mail" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Senha</FormLabel>
          <FormControl>
            <Input type="password" placeholder="Insira sua senha" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" class="w-full bg-primary"> Entrar </Button>
    </form>

    <!-- <div class="space-y-4">
      <span class="divider font-medium text-accent-foreground before:border-accent after:border-accent">ou</span>
      <div class="flex flex-col items-center gap-3">
        <Button class="w-full">Continuar com o Google</Button>
      </div>
    </div> -->

    <p>Ainda não possui cadastro? <span @click="router.push({ name: 'RegisterIndex' })" class="underline cursor-pointer">Crie uma conta</span></p>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Login } from "@/services/auth/authService";
import { authService } from "@/services/auth/authService";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "vue-sonner";
import Input from "@/components/ui/input/Input.vue";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const router = useRouter();

const formSchema = toTypedSchema(
  z.object({
    email: z.string({ message: "Campo obrigatório." }).email("E-mail inválido."),
    password: z.string({ message: "Campo obrigatório." }),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values: Login) => {
  const res = await authService.login(values);

  if (!res.ok) {
    if (res.errors?.message) {
      toast.error("Ocorreu um erro!", {
        description: res.errors?.message[0],
      });
    }

    return;
  }

  router.push({ name: "Index" });
});
</script>

<style scoped>
.divider {
  display: flex;
  flex-direction: row;
}
.divider:before,
.divider:after {
  content: "";
  flex: 1 1;
  border-style: solid;
  border-width: 1px;
  margin: auto;
}
.divider:before {
  margin-right: 10px;
}
.divider:after {
  margin-left: 10px;
}
</style>
