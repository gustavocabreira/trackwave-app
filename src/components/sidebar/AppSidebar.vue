<template>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger class="w-full">
              <SidebarMenuButton size="lg" class="cursor-pointer">
                <Avatar class="h-8 w-8 rounded-lg">
                  <AvatarImage :src="'https://static.vecteezy.com/ti/fotos-gratis/t2/42730459-leao-perigo-animal-animais-selvagens-natureza-floresta-foto.jpg'" :alt="currentOrganization.name" />
                  <AvatarFallback class="rounded-lg"> {{ getInitials(currentOrganization.name) }} </AvatarFallback>
                </Avatar>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">{{ currentOrganization.name }}</span>
                  <span class="truncate text-xs">Lorem Ipsum</span>
                </div>
                <ChevronsUpDown class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="max-w-70 rounded-lg" align="start" side="right" :side-offset="4">
              <DropdownMenuLabel class="text-xs text-muted-foreground"> Organizations </DropdownMenuLabel>
              <DropdownMenuItem v-for="organization in organizations" :key="organization.name" class="gap-2 p-2" @click="currentOrganization = organization">
                <Avatar class="h-8 w-8 rounded-lg">
                  <AvatarImage :src="'https://static.vecteezy.com/ti/fotos-gratis/t2/42730459-leao-perigo-animal-animais-selvagens-natureza-floresta-foto.jpg'" :alt="organization.name" />
                  <AvatarFallback class="rounded-lg"> {{ getInitials(organization.name) }} </AvatarFallback>
                </Avatar>

                <span class="truncate"> {{ organization.name }}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem class="gap-2 p-2">
                <div class="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus class="size-4" />
                </div>
                <div class="font-medium text-muted-foreground">New organization</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in sidebarItems" :key="item.title">
              <SidebarMenuButton as-child :is-active="route.name === item.pathName">
                <a @click="navigateTo(item.path)" href="#">{{ item.title }}</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton size="lg" class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Avatar class="h-8 w-8 rounded-lg">
                  <AvatarImage :src="'https://static.vecteezy.com/ti/fotos-gratis/t2/42730459-leao-perigo-animal-animais-selvagens-natureza-floresta-foto.jpg'" :alt="'Joãozinho'" />
                  <AvatarFallback class="rounded-lg"> {{ getInitials(user.name) }} </AvatarFallback>
                </Avatar>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">{{ user.name }}</span>
                  <span class="truncate text-xs">{{ user.name }}</span>
                </div>
                <ChevronsUpDown class="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="max-w-70 rounded-lg" :side="isMobile ? 'bottom' : 'right'" align="end" :side-offset="4">
              <DropdownMenuLabel class="p-0 font-normal">
                <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage :src="'https://static.vecteezy.com/ti/fotos-gratis/t2/42730459-leao-perigo-animal-animais-selvagens-natureza-floresta-foto.jpg'" :alt="'Joãozinho'" />
                    <AvatarFallback class="rounded-lg"> {{ getInitials(user.name) }} </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ user.name }}</span>
                    <span class="truncate text-xs">{{ user.email }}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Settings />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronsUpDown, Plus, Settings, LogOut } from "lucide-vue-next";
import { getInitials } from "@/helpers/utils";
import { User } from "@/types/user";
import { useRouter, useRoute } from "vue-router";

type Props = {
  organizations: any[];
  user: User[];
};

const props = defineProps<Props>();

const router = useRouter();
const route = useRoute();
const { isMobile } = useSidebar();

const currentOrganization = ref<any>(props.organizations[0]);

const sidebarItems = [
  {
    title: "Home",
    icon: "home",
    pathName: "Index",
  },
];

function navigateTo(pathName: string) {
  router.push({ name: pathName });
}
</script>
