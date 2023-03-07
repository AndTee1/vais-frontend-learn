<template>
  <div>
    <div v-if="error && error.statusCode === 404">
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1
              class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500"
            >
              404
            </h1>
            <p
              class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white"
            >
              Trang không tồn tại
            </p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Vui lòng kiểm tra lại đường dẫn hoặc bấm quay lại trang chủ
            </p>
            <FormMyButton :handler="resetError" :disable-loading="true">
              Back to Homepage
            </FormMyButton>
          </div>
        </div>
      </section>
    </div>
    <div v-else-if="error && error.statusCode === 500">
      <section class="bg-white dark:bg-gray-900">
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
              Chúng tôi đang cố gắng khắc phục lỗi này, xin vui lòng thử lại
              sau.
            </p>
            {{ error.message }}
            <br />
            <div class="text-left!" v-html="error.stack" />
          </div>
        </div>
      </section>
    </div>
    <div v-else>
      Unknown error:
      {{ error }}
    </div>
  </div>
</template>

<script setup>
const error = useError();
console.log("error.vue catch error ", error);
const resetError = async () => {
  error.value = null;
  await navigateTo("/");
};
</script>
