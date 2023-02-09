<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg" v-if="userStore.tableData">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Confirmed diff
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Deaths diff
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Active diff
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    v-for="({ data }, index) in userStore.tableData" :key="data.date">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ data.date }}
                        </th>
                        <td class="px-6 py-4">
                            {{ data.confirmed_diff }}
                        </td>
                        <td class="px-6 py-4">
                            {{ data.deaths_diff }}
                        </td>
                        <td class="px-6 py-4">
                            {{ data.active_diff }}
                        </td>
                        <td class="px-6 py-4">
                            <a 
                                @click="userStore.removeTableItem(index)" 
                                href="#"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                DELETE
                            </a>
                        </td>
                </tr>
            </tbody>
        </table>
    </div>

    <button 
        type="button" 
        @click="userStore.fetchTableData()"
        class="mt-3 inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-red-400 transition duration-150 ease-in-out border-2 border-red-400 rounded-md shadow">
            <span>Reload</span>
    </button>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
const userStore = useUserStore()

onMounted(() => {
    userStore.getTableData()
})
</script>