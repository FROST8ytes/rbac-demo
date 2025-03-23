<script setup lang="ts">
import { useToast } from "@/components/ui/toast/use-toast";

definePageMeta({
  layout: false,
});

const { loggedIn, user, fetch: refreshSession } = useUserSession();

const { toast } = useToast();

const credentials = reactive({
  username: "",
  password: "",
});

async function login() {
  $fetch("/api/login", {
    method: "POST",
    body: credentials,
  })
    .then(async () => {
      await refreshSession().then(async () => {
        await navigateTo("/");
      });
    })
    .catch((e) =>
      toast({
        title: "Unable to login",
        description: e,
        variant: "destructive",
      })
    );
}
</script>

<template>
  <main class="w-full h-screen flex items-center justify-center px-4">
    <form @submit.prevent="login">
      <Card class="w-full max-w-sm">
        <CardHeader>
          <CardTitle class="text-2xl flex justify-between">Login<DarkModeToggle /></CardTitle>
          <CardDescription>Enter your username below to login to your account.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Username</Label>
            <Input
              id="email"
              type="text"
              placeholder="john.doe"
              v-model="credentials.username"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              v-model="credentials.password"
              required
              placeholder="••••••••"
            />
          </div>
        </CardContent>
        <CardFooter class="flex-col">
          <Button class="w-full" type="submit">Sign in</Button>
        </CardFooter>
      </Card>
    </form>
  </main>
</template>
