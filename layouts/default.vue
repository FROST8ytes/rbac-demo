<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {
  BadgeCheck,
  Bell,
  Bot,
  ChevronsUpDown,
  Globe,
  BriefcaseBusiness,
  HandCoins,
  LogOut,
  Sparkles,
  Plus,
  LayoutDashboard,
} from "lucide-vue-next";
import lodash from "lodash";

import { useToast } from "@/components/ui/toast/use-toast";

const data = {
  projects: [
    {
      name: "Invent for the Planet Hackathon 2025",
      url: "#",
      icon: Globe,
    },
    {
      name: "Petrobots Hackathon 2025",
      url: "#",
      icon: Bot,
    },
  ],
};

const router = useRouter();
const route = useRoute();
const { user, clear: clearSession } = useUserSession();
const { toast } = useToast();

const breadcrumbs = computed(() => {
  const segments = route.path.split("/").filter(Boolean);
  return segments.map((segment, index) => ({
    name: lodash.startCase(segment.replace(/-/g, " ")),
    path: "/" + segments.slice(0, index + 1).join("/"),
  }));
});

async function logout() {
  await clearSession();
  await navigateTo("/");
}
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div
                    class="flex items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                  >
                    <NuxtImg src="/rhb.webp" alt="district emblem" class="h-6" />
                  </div>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">Bank</span>
                    <span class="truncate text-xs">Seri Iskandar</span>
                  </div>
                  <ChevronsUpDown class="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="bottom"
                :side-offset="4"
              >
                <DropdownMenuLabel class="text-xs text-muted-foreground">
                  Location
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="gap-2 p-2" disabled>
                  <div
                    class="flex size-6 items-center justify-center rounded-md border bg-background"
                  >
                    <Plus class="size-4" />
                  </div>
                  <div class="font-medium text-muted-foreground">Add location</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup class="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton as-child>
                <NuxtLink to="/dashboard"><LayoutDashboard />Dashboard</NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem v-if="user.role === 'ADMINISTRATOR'">
              <SidebarMenuButton as-child>
                <NuxtLink to="/employees"><BriefcaseBusiness />Employee Management</NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem v-if="user.role === 'ADMINISTRATOR' || user.role === 'MODERATOR'">
              <SidebarMenuButton as-child>
                <NuxtLink to="/customers"><HandCoins />Customer Management</NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarFallback class="rounded-lg">69</AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ user.full_name }}</span>
                    <span class="truncate text-xs">{{ user.role }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                :side-offset="4"
              >
                <DropdownMenuLabel class="p-0 font-normal">
                  <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar class="h-8 w-8 rounded-lg">
                      <AvatarFallback class="rounded-lg">69</AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{ user.full_name }}</span>
                      <span class="truncate text-xs">{{ user.role }}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Deez Nuts
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="logout">
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4 w-full">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator v-if="breadcrumbs.length > 0" />

              <template v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.path">
                <BreadcrumbItem v-if="index !== breadcrumbs.length - 1" class="hidden md:block">
                  <BreadcrumbLink :href="breadcrumb.path">{{ breadcrumb.name }}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  v-if="index !== breadcrumbs.length - 1"
                  class="hidden md:block"
                />
                <BreadcrumbItem v-else>
                  <BreadcrumbPage>{{ breadcrumb.name }}</BreadcrumbPage>
                </BreadcrumbItem>
              </template>
            </BreadcrumbList>
          </Breadcrumb>

          <div class="ml-auto flex gap-4 justify-center align-center">
            <DarkModeToggle variant="ghost" />
          </div>
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
