<template>
  <div class="m-5">
    <p>Demo</p>
    <FormMyButton :handler="make200Request" test-id="loading-on-button">
      Loading on button
    </FormMyButton>
    <FormMyButton
      :handler="make200Request"
      :loading-global="true"
      test-id="loading-global"
    >
      Loading global
    </FormMyButton>
    <FormMyButton
      :handler="make200Request"
      :loading-container="loadingContainer"
      test-id="loading-on-container"
    >
      Loading on container
    </FormMyButton>
    <div ref="loadingContainer" style="position: relative">
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>
  </div>
</template>

<script setup>
// const { useToast } = await import("vue-toastification");
definePageMeta({
  layout: "custom",
});

const toast = useVaisToast();

const loadingContainer = ref(null);

const make200Request = async () => {
  await new Promise((r) => setTimeout(r, 2000));

  const { error } = await useVaisRestFulAndHandleErrors("/api/demo/demo200");
  if (!error.value) {
    toast.info("Request OK");
  } else {
    toast.info("Request error");
  }
};

onMounted(async () => {});
</script>
