<template>
  <div class="m-5">
    <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      Refresh to page
    </h2>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "custom",
});

const confirmBeforeLeave = () => {
  const answer = window.confirm("Bạn có chắc muốn thoát trang");
  // cancel the navigation and stay on the same page
  if (!answer) return false;
};
const beforeWindowUnload = (e) => {
  const answer = window.confirm("Bạn có chắc muốn thoát trang");
  // cancel the navigation and stay on the same page
  if (!answer) {
    e.preventDefault();
    // Chrome requires returnValue to be set
    e.returnValue = "";
  }
};
onBeforeRouteLeave(() => {
  return confirmBeforeLeave();
});

onMounted(() => {
  window.addEventListener("beforeunload", beforeWindowUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", beforeWindowUnload);
});
</script>
