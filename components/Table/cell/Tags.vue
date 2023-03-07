<template>
  <div class="flex items-center">
    <div
      v-if="tags.length > 0"
      class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
    >
      {{ tags[0][keytag] }}
    </div>
    <div
      v-if="tags.length > 1"
      class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
    >
      {{ tags[1][keytag] }}
    </div>
    <div
      :data-tooltip-target="`tag-${id}`"
      v-if="tags.length > 2"
      class="bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300"
    >
      + {{ tags.length - 2 }}
    </div>
    <div
      :id="`tag-${id}`"
      role="tooltip"
      class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
    >
      <ul class="list-disc px-4">
        <li v-for="(item, index) in tags.slice(2)" :key="index">
          {{ item[keytag] }}
        </li>
      </ul>
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
  keytag: {
    type: [Number, String],
    default: null,
  },
  id: {
    type: String,
    default: "",
  },
});
</script>
