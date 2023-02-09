<template>
    <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <a href="https://flowbite.com" class="flex items-center">
                    <img src="ua.png" class="mr-3 h-6 sm:h-9" alt="Ukraine Covid-19 Statistic" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">UA Covid-19</span>
                </a>
                <div class="flex items-center lg:order-2">
                    <a
                        @click="userStore.logout()"
                        v-if="userStore.isLogged"
                        class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                        Logout
                </a>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
    const userStore = useUserStore()
</script>