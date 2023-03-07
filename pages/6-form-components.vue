<template>
  <div class="m-5">
    <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      Input
    </h2>

    <div>
      <div class="bg-yellow-200">
        <p>
          Nguyên tắc khi phát triển component <b><code>input</code></b>
        </p>
        <ul class="space-y-1 list-disc list-inside">
          <li>
            Luôn có trường <code>data-testid</code> phục vụ cho automation
            testing
          </li>
          <li>
            Có validation và có thông báo cụ thể cho người dùng biết lỗi sai như
            thế nào
          </li>
          <li>
            Hiển thị màu sắc khác nhau đối với từng loại lỗi. Ví dụ màu đỏ nền
            và đỏ chữ khi sai valid, còn màu gray-500 khi nhập đúng.
          </li>
        </ul>
      </div>
      <p>Ví dụ</p>
      <FormMyInput
        v-model="mydata"
        place-holder="Email"
        test-id="test"
        :validator="validator"
        title="Nhập địa chỉ email của bạn"
        class="w-6/12 mt-2"
        invalid-message="Bạn cần nhập đúng format email. Ví dụ: abc@gmail.com"
      />

      <FormMyInput
        v-model="mydata"
        place-holder="Random input"
        test-id="test"
        class="w-52"
        :validator="() => {}"
        :disabled="true"
      />
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "custom",
});

const mydata = ref("");
const validator = (data) => {
  if (data) {
    return data.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  }
  return true;
};
</script>
