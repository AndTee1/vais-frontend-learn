<template>
  <div>
    <span
      class="inline-flex items-center px-4 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"
    >
      <slot />
      <button
        v-if="type === 'action'"
        type="button"
        class="inline-flex items-center p-0.5 ml-2 text-sm text-gray-500 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
        aria-label="Remove"
        @click="cancel()"
      >
        <svg
          class="w-3.5 h-3.5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </span>
  </div>
</template>
<script setup>
import { initDismisses } from "flowbite";
const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "action",
  },
});
onMounted(() => {
  initDismisses();
});
const cancel = () => {
  emit("click", props.id);
};
const emit = defineEmits(["click"]);
</script>
