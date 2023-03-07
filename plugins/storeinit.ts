import { useUserStore } from "~~/stores/useUserStore";

const initUserStoreInfo = async () => {
  const userInfo = useUserInfo();
  const userStore = useUserStore();
  try {
    const res = await userInfo.getInfo();
    userStore.setUser(res.data);
  } catch (error) {
    console.log("error init store", error);
  }
  return userStore;
};

export default defineNuxtPlugin(async () => {
  await initUserStoreInfo();
  return {
    provide: {
      loadUserInfo: async () => {
        const u = await initUserStoreInfo();
        return u;
      },
    },
  };
});
