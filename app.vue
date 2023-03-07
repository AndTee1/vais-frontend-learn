<template>
  <section v-if="error" class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1
          class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500"
        >
          500
        </h1>
        <p
          class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white"
        >
          Xin lỗi, hệ thống đang gặp lỗi
        </p>
        <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          Chúng tôi đang cố gắng khắc phục lỗi này, xin vui lòng thử lại sau.
        </p>
        {{ error.message }}
        <br />
        <div class="text-left!" v-html="error.stack" />
        <FormMyButton @click="resetError()"> Thử lại </FormMyButton>
      </div>
    </div>
  </section>
  <div v-else>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <div class="flex h-screen justify-center items-center">
    <WorkingSessionExpire v-if="errorRedirectModal" @cancel="resetError" />
  </div>
</template>
<script setup>
import WorkingSessionExpire from "./components/WorkingSessionExpire.vue";

const toast = useVaisToast();
const error = ref(null);
const errorRedirectModal = ref(false);
const resetError = () => {
  error.value = null;
  errorRedirectModal.value = false;
};

onMounted(async () => {});
// onErrorCaptured((err, instance, info) => {
onErrorCaptured((err) => {
  if (err.message.includes("Failed to fetch")) {
    toast.error("Lỗi kết nối, vui lòng kiểm tra trạng thái mạng.");
  } else if (err.statusCode === 401) {
    if (err.statusMessage == "UserSessionExpired") {
      errorRedirectModal.value = true;
    } else {
      toast.error(
        "Không thực hiện được tác vụ do chưa xác thực được người dùng"
      );
    }
  } else {
    toast.error(err.message);
  }

  // console.log("error log app.vue", err.statusCode)
  // if (process.env.NODE_ENV !== "production") {
  //   error.value = err;
  // } else {
  //   toast.error(err.message);
  // }
});
</script>
