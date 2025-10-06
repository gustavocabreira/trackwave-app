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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: false },
      },
      {
        path: "login",
        component: LoginView,
        name: "LoginIndex",
        meta: { requiresAuth: false },
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
        meta: { requiresAuth: true },
      },
    ],
  },
];
