<template>
  <div
    class="skeleton-box"
    :class="className"
    style="border-radius: 4px"
    :style="{ width: width, height: height }"
  />
</template>

<script setup>
defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "21px",
  },
  className: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.skeleton-box {
  // display: inline-block;
  position: relative;
  overflow: hidden;
  background-color: #e4e4e7;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      #e4e4e7 22.78%,
      #ffffff 46.74%,
      #e4e4e7 73.83%
    );
    animation: shimmer 2s infinite;
    content: "";
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
tr:nth-child(odd) {
  background-color: #fafafa;
}
</style>
