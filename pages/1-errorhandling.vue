<template>
  <div class="m-5">
    <p>Định nghĩa các nút bấm</p>
    <pre><code class="html">&lt;FormMyButton :handler=&quot;functionName&quot;&gt;
  200 Request
&lt;/FormMyButton&gt;
</code></pre>
    <div class="mt-2">
      Composable <code>const api = useVaisApi()</code> cung cấp hàm makeRequest
      sẽ tự xử lý các trường hợp sau:
      <ul class="space-y-1 list-disc list-inside">
        <li>
          Token hết hạn, invalid: tự động refresh. Nếu refresh failed thì sẽ
          hiển thị dialog login
        </li>
        <li>
          Lỗi HTTP: 4xx, 5xx: Hiển thị toast message và ngừng chạy các lệnh sau
          đó
        </li>
      </ul>
    </div>
  </div>
  <div class="m-5">
    <FormMyButton :handler="make200Request" test-id="200request">
      200 Request
    </FormMyButton>

    <pre><code class="javascript">await api.makeRequest("/api/demo/demo200");
</code></pre>

    <FormMyButton
      :handler="make400ErrorRequest"
      test-id="400request"
      class="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300"
    >
      400 Request
    </FormMyButton>
    <pre><code class="javascript">await api.makeRequest("/api/demo/demo400");</code></pre>

    <FormMyButton
      :handler="make401ErrorRequest"
      test-id="401request"
      class="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300"
    >
      401 Request
    </FormMyButton>
    <pre><code class="javascript">await api.makeRequest("/api/demo/demo401");
</code></pre>

    <FormMyButton
      :handler="make500ErrorRequest"
      test-id="500request"
      class="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300"
    >
      500 Request
    </FormMyButton>
    <div>
      <FormMyButton :handler="expireAccessToken" test-id="make-expire-access">
        Make access token invalid
      </FormMyButton>
      <FormMyButton :handler="expireRefreshToken" test-id="make-expire-refresh">
        Make refresh token invalid
      </FormMyButton>
    </div>
  </div>
</template>

<script setup lang="ts" allowJs="true">
const toast = useVaisToast();
const api = useVaisApi({ useAuthen: true });
definePageMeta({
  layout: "custom",
  middleware: ["auth"],
});
// const { $sentryCaptureException } = useNuxtApp();

const make200Request = async () => {
  await api.makeRequest("/api/demo/demo200");
  toast.info("Request OK");
};

const make400ErrorRequest = async () => {
  // await api.makeRequest("/api/demo/demo400");
  throw createError({ statusMessage: "error400", statusCode: 400 });
};

const make401ErrorRequest = async () => {
  throw createError({ statusMessage: "error123", statusCode: 401 });
  // await api.makeRequest("/api/demo/demo401");
};

async function make500ErrorRequest() {
  await api.makeRequest("/api/demo/demo500");
}
const expireRefreshToken = async () => {
  const token = useToken();
  token.value.refreshToken = "";
  toast.info("OK");
};

const expireAccessToken = async () => {
  const token = useToken();
  token.value.accessToken = "";
  toast.info("OK");
};

onMounted(() => {});
</script>
