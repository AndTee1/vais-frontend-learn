<template>
  <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
    <div class="flex flex-wrap justify-between items-center">
      <div class="flex justify-start items-center">
        <NuxtLink to="/" class="flex mr-4">
          <span
            class="self-center text-l font-semibold whitespace-nowrap dark:text-white"
            >VAIS frontend guideline</span
          >
        </NuxtLink>

        <div v-if="userStore.user" class="flex items-center lg:order-2">
          <button
            id="user-menu-button"
            type="button"
            class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded="false"
            data-dropdown-toggle="dropdown-user-info"
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="user photo"
            />
          </button>
          <!-- Dropdown menu -->
          <div
            id="dropdown-user-info"
            class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <div class="py-3 px-4">
              <span
                class="block text-sm font-semibold text-gray-900 dark:text-white"
                >{{ userStore.user?.name }}</span
              >
              <span
                class="block text-sm font-light text-gray-500 truncate dark:text-gray-400"
                >{{ userStore.user?.sub }}</span
              >
            </div>

            <ul
              class="py-1 font-light text-gray-500 dark:text-gray-400"
              aria-labelledby="dropdown"
            >
              <li>
                <a
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="logout"
                  >Sign out</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="flex items-center lg:order-2">
          <button
            id="user-menu-button"
            type="button"
            @click="
              async () => {
                await navigateTo('/login');
              }
            "
          >
            <span>Đăng nhập</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts" allowJs="true">
import { initModals, initDrawers, initDropdowns } from "flowbite";
import { useUserStore } from "~~/stores/useUserStore";
const auth = useVaisAuth();
const userStore = useUserStore();
// console.log("userStore", userStore.user?.ChucVu.name);

onMounted(() => {
  // set timeout to prevent initDrawers run before Dropdown DOM generated.
  setTimeout(() => {
    initDrawers();
    initDropdowns();
    initModals();
  }, 1000);
});

const logout = async () => {
  await auth.logout();
  await navigateTo("/login");
};
</script>
