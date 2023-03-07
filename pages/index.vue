<template>
  <div class="gap-4 p-10">
    <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      VAIS frontend guideline
    </h2>
    <div>
      <ul class="space-y-1 max-w-md list-disc list-inside">
        <li>
          <NuxtLink to="/login"> Login </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/book"> Book </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/1-errorhandling?abc=123"> Error handling </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/2-fetch"> Fetch from API </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/3-pagingnew"> Paging and navigation </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/4-loading"> Loading </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/5-routing"> Routing </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/6-form-components"> Form components </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/7-confirmbeforeleave"> Confirm before leave </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
// import { useApi } from "#app";
// console.log(useApi);
</script>
