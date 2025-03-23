<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
});

const { user, clear: clearSession } = useUserSession();

async function logout() {
  await clearSession();
  await navigateTo("/login");
}
</script>

<template>
  <div>
    <h1>Welcome {{ user.full_name }}</h1>
    <Button @click="logout">Logout</Button>
  </div>
</template>
