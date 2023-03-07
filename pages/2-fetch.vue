<template>
  <div class="grid grid-cols-1 gap-0 sm:grid-cols-4">
    <div style="position: relative" class="mb-3 col-span-2 px-5">
      <FormMyButton :handler="singleFetch" test-id="single-fetch">
        Single fetch success
      </FormMyButton>
      <pre><code class="javascript">const data = await api.makeRequest(
  "/api/demo/demo200",
);
</code></pre>
      <FormMyButton
        :handler="singleFetchError"
        test-id="single-fetch-error"
        class="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300"
      >
        Single fetch with 400 error
      </FormMyButton>
      <pre><code class="javascript">const data = await api.makeRequest(
  "/api/demo/demo400",
);
// Vì request bị lỗi, các lệnh tiếp theo sẽ không chạy
result.value = data
</code></pre>
      <FormMyButton :handler="multiFetch" test-id="multi-fetch">
        Multiple fetch
      </FormMyButton>
      <pre><code class="javascript">const data = await api.makeRequestParallel([
  {url: "/api/demo/demo200", options: {key: "request1"}},
  {url: "/api/demo/demo200-2", options: {key: "request2"}},
]);
</code></pre>
      <FormMyButton
        :handler="multiFetchError"
        test-id="multi-fetch-error"
        class="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300"
      >
        Multiple fetch with error
      </FormMyButton>
      <pre><code class="javascript">const data = await api.makeRequestParallel([
  {url: "/api/demo/demo400", options: {key: "request1"}},
  {url: "/api/demo/demo200-2", options: {key: "request2"}},
]);
// Lệnh dưới đây sẽ không chạy
console.log("data", data)
</code></pre>
    </div>

    <div class="col-span-2 mb-3">
      {{ JSON.stringify(result, null, 4) }}
    </div>
  </div>
</template>

<script setup lang="ts" allowJs="true">
definePageMeta({
  layout: "custom",
});
const toast = useVaisToast();
const api = useVaisApi();
const result = ref<string | object>("Output");

const singleFetch = async () => {
  const data = await api.makeRequest("/api/demo/demo200");
  toast.info("Request ok", { timeout: 1000 });
  result.value = data as string;
};

const singleFetchError = async () => {
  const data = await api.makeRequest("/api/demo/demo400");
  // Vì request bị lỗi, các lệnh tiếp theo sẽ không chạy
  result.value = data as string;
};

const multiFetch = async () => {
  const data = await api.makeRequestParallel([
    { url: "/api/demo/demo200", options: { key: "request1" } },
    { url: "/api/demo/demo200-2", options: { key: "request2" } },
  ]);
  toast.info("Request ok", { timeout: 1000 });
  result.value = data;
};

const multiFetchError = async () => {
  const data = await api.makeRequestParallel([
    { url: "/api/demo/demo400", options: { key: "request1" } },
    { url: "/api/demo/demo200-2", options: { key: "request2" } },
  ]);
  // Lệnh dưới đây sẽ không chạy
  console.log("data", data);
};

onMounted(async () => {});
</script>
