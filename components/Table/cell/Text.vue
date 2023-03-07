<template>
  <div class="text-ellipsis">
    <slot />
  </div>
</template>
<script setup></script>
<style lang="scss">
.text-ellipsis {
  display: inline-block;
  width: 120px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
</style>
