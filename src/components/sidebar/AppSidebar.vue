<template>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger class="w-full">
              <SidebarMenuButton size="lg" class="cursor-pointer">
                <div class="size-10 flex justify-center items-center bg-primary font-semibold text-white rounded-lg">
                  {{ getInitials(selectedOrganization.name) }}
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">{{ selectedOrganization.name }}</span>
                  <span class="truncate text-xs">Lorem Ipsum</span>
                </div>
                <ChevronsUpDown class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-[--reka-dropdown-menu-trigger-width] min-w-60 rounded-lg" align="start" side="right" :side-offset="4">
              <DropdownMenuLabel class="text-xs text-muted-foreground"> Organizations </DropdownMenuLabel>
              <DropdownMenuItem v-for="organization in organizations" :key="organization.name" class="gap-2 p-2" @click="selectedOrganization = organization">
                <div class="size-8 flex justify-center items-center bg-primary font-semibold text-white rounded-lg">
                  {{ getInitials(organization.name) }}
                </div>
                {{ organization.name }}
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
      <SidebarGroup />
      <SidebarGroup />
    </SidebarContent>

    <SidebarFooter />
  </Sidebar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, Plus } from "lucide-vue-next";
import { getInitials } from "@/helpers/utils";

const organizations = [
  {
    name: "My Personal Organization",
  },
  {
    name: "Organization 2",
  },
  {
    name: "Organization 3",
  },
];

const selectedOrganization = ref<any>(organizations[0]);
</script>

<style scoped></style>
