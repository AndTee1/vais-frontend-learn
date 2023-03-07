<template>
  <div>
    <NuxtLoadingIndicator />
    <ApplicationHeaderNavBar />
    <slot />
  </div>
</template>

<script setup>
// import { useUserStore } from "~~/stores/useUserStore";
// const userInfo = useUserInfo();
// const userStore = useUserStore();

// const res = await userInfo.getInfo();
// userStore.$patch((state) => {
//   state.user.name = res.data.name;
//   state.user.VaiTro = res.data.VaiTro;
// });
</script>
