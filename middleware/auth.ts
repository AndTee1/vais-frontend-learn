import { useUserStore } from "~~/stores/useUserStore";
export default defineNuxtRouteMiddleware(async (to) => {
  const token = useToken();
  const userStore = useUserStore();
  const { $loadUserInfo } = useNuxtApp();

  if (token.value.refreshToken && !userStore.user) {
    // Try to set userStore
    await $loadUserInfo();
  }

  if (!token.value.refreshToken || !userStore.user) {
    return navigateTo({
      name: "login",
      query: {
        redirect_uri: encodeURIComponent(window.location.origin + to.fullPath),
      },
    });
  }
  //   if (to.params.id === "1") {
  //     return abortNavigation();
  //   }
  //   return navigateTo("/");
});
