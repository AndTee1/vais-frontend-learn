<template>
  <div>
    <NuxtLoadingIndicator />
    <div class="m-5">
      <FormMyButton :handler="goHome" :disable-loading="true" test-id="goback">
        Go back
      </FormMyButton>
    </div>
    <slot />
  </div>
</template>
