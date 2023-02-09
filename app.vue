<template>
  <div class="relative bg-gradient-to-br from-sky-50 to-gray-200 h-screen">  
    <AppHeader />
    <div class="pt-16 relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40" v-if="userStore.isAuth">
        <LoginForm v-if="!userStore.isLogged" />
        <StatisticTable v-else />
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const userStore = useUserStore();

const loggedIn = ref(false)

onMounted(() => {
  userStore.authenticate();
})
</script>
