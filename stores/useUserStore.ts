import { defineStore } from "pinia";
import { UserInfo } from "~~/types/user";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserInfo | null>();

  const isSet = computed(() => user.value?.name !== "");
  const setUser = (_user: UserInfo) => {
    user.value = _user;
  };
  return { user, isSet, setUser };
});
