<template>
  <div class="flex justify-center items-center">
    <div>
      <RedirectingModal />
    </div>

    <div v-show="showLoging" class="m-5 mt-20">
      <div
        class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <form class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Đăng nhập
          </h5>
          <div>
            <FormMyInput
              v-model="email"
              place-holder="your@email.com"
              style="width: 320px"
              test-id="email"
              :validator="validator.validateEmailAndUsername"
              autocomplete="username"
              title="Nhập địa chỉ email của bạn"
              invalid-message="Bạn cần nhập đúng format email / username. Ví dụ: abc@gmail.com"
            />
          </div>
          <div>
            <FormMyInput
              v-model="password"
              place-holder="••••••••"
              test-id="password"
              type="password"
              :validator="validator.validateEmailAndUsername"
              autocomplete="current-password"
              title="Password"
              invalid-message="Bạn cần nhập đúng format password"
            />
          </div>
          <div class="flex items-start">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  v-model="rememberMe"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                for="remember"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Remember me</label
              >
            </div>
            <a
              href="#"
              class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
              >Lost Password?</a
            >
          </div>
          <FormMyButton
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            :handler="login"
            test-id="login"
          >
            Login to your account
          </FormMyButton>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?
            <a href="#" class="text-blue-700 hover:underline dark:text-blue-500"
              >Create account</a
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "login",
});
const { $loadUserInfo } = useNuxtApp();
const toast = useVaisToast();
const auth = useVaisAuth();
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const validator = useVaisValidator();
const route = useRoute();
const modal = ref();
const showLoging = ref(true);

onMounted(async () => {});

const login = async () => {
  await auth.login(email.value, password.value);
  toast.info("Đăng nhập thành công");
  await $loadUserInfo();

  const options = {
    placement: "center",
    closable: true,
  };
  if (route.query?.redirect_uri) {
    const redirectUrl = decodeURIComponent(route.query.redirect_uri);
    console.log("redirect to ", redirectUrl);
    window.location = redirectUrl;
  } else {
    console.log("redirect to / ");
    await navigateTo("/");
  }
  // const $targetEl = document.getElementById("redirectingModal");
  // modal.value = new Modal($targetEl, options);
  // modal.value.show();
  // showLoging.value = false;
  // setTimeout(async () => {
  //   modal.value.hide();
  //   console.log("route query", route.query);

  // }, 3000);
};

const logout = async () => {
  await auth.logout();
  toast.info("Đăng xuất thành công");
};
</script>
