import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import EmailVerificationView from "@/views/auth/EmailVerificationView.vue";
import Index from "@/views/Index.vue";
import AppLayout from "@/views/layouts/AppLayout.vue";
import GuestLayout from "@/views/layouts/GuestLayout.vue";

export default [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "",
        component: Index,
        name: "Index",
      },
    ],
  },
  {
    path: "/auth",
    component: GuestLayout,
    children: [
      {
        path: "register",
        component: RegisterView,
        name: "RegisterIndex",
      },
      {
        path: "login",
        component: LoginView,
        name: "LoginIndex",
      },
    ],
  },
  {
    path: "/verify-email",
    component: GuestLayout,
    children: [
      {
        path: "",
        component: EmailVerificationView,
        name: "EmailVerificationIndex",
      },
    ],
  },
];
