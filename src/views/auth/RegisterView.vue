<template>
  <section class="space-y-8 text-center">
    <img src="@/assets/images/temporary_logo.png" alt="Logo" class="w-24 h-16 mx-auto" />

    <h1 class="text-3xl font-medium">Create an account</h1>

    <form @submit.prevent="onSubmit" class="space-y-4 w-md text-start">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Nome</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Insira seu nome completo" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
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
            <div class="relative w-full items-center">
              <Input :type="showPassword.inputType" placeholder="Insira sua senha" v-bind="componentField" />
              <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer" @click="togglePassword">
                <Eye v-if="showPassword.visible" :size="18" />
                <EyeOff v-else :size="18" />
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password_confirmation">
        <FormItem>
          <FormLabel>Confirme a senha</FormLabel>
          <FormControl>
            <div class="relative w-full items-center">
              <Input :type="showConfirmPassword.inputType" placeholder="Confirme a sua senha" v-bind="componentField" />
              <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer" @click="toggleConfirmPassword">
                <Eye v-if="showConfirmPassword.visible" :size="18" />
                <EyeOff v-else :size="18" />
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" class="w-full"> Cadastrar </Button>
    </form>

    <p>Já possui cadastro? <span @click="router.push({ name: 'LoginIndex' })" class="underline cursor-pointer">Entrar na conta</span></p>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { type UserRegistration } from "@/services/auth/authService";
import { authService } from "@/services/auth/authService";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "vue-sonner";
import { FormField } from "@/components/ui/form";
import FormItem from "@/components/ui/form/FormItem.vue";
import FormControl from "@/components/ui/form/FormControl.vue";
import FormMessage from "@/components/ui/form/FormMessage.vue";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";
import { Eye, EyeOff } from "lucide-vue-next";

type ShowPassword = {
  inputType: "password" | "text";
  visible: boolean;
};

const router = useRouter();

const showPassword = ref<ShowPassword>({
  inputType: "password",
  visible: false,
});
const showConfirmPassword = ref<ShowPassword>({
  inputType: "password",
  visible: false,
});

const formSchema = toTypedSchema(
  z
    .object({
      name: z.string({ message: "Campo obrigatório." }),
      email: z.string({ message: "Campo obrigatório." }).email("E-mail inválido."),
      password: z
        .string({ message: "Campo obrigatório." })
        .min(8, { message: "A senha deve conter ao menos 8 caracteres." })
        .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula." })
        .regex(/[^A-Za-z0-9]/, { message: "A senha deve conter ao menos um símbolo." }),
      password_confirmation: z.string({ message: "Campo obrigatório." }).min(8, { message: "A senha deve conter ao menos 8 caracteres." }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.password_confirmation) {
        ctx.addIssue({
          code: "custom",
          path: ["password_confirmation"],
          message: "As senhas devem ser iguais.",
        });
      }
    })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values: UserRegistration) => {
  const res = await authService.register(values);

  if (!res.ok) {
    if (res.errors?.message) {
      toast.error("Ocorreu um erro!", {
        description: res.errors?.message,
      });
    }

    return;
  }

  login(values.email, values.password);
});

async function login(email: string, password: string) {
  await authService.login({
    email,
    password,
  });

  router.push({ name: "Index" });
}

function togglePassword() {
  showPassword.value.inputType = showPassword.value.inputType === "password" ? "text" : "password";
  showPassword.value.visible = !showPassword.value.visible;
}

function toggleConfirmPassword() {
  showConfirmPassword.value.inputType = showConfirmPassword.value.inputType === "password" ? "text" : "password";
  showConfirmPassword.value.visible = !showConfirmPassword.value.visible;
}
</script>
