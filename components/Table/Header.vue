<template>
  <thead
    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
  >
    <tr>
      <th
        scope="col"
        class="px-6 py-3"
        v-for="(book, bookIndex) in data.data"
        :key="bookIndex"
      >
        <div class="flex items-center justify-between">
          <span>{{ book.name }}</span>
          <div class="flex">
            <button v-if="book.sort" @click="sort(book.key)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3 h-3 ml-1"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path
                  d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                />
              </svg>
            </button>
            <button v-if="book.filter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3 h-3 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </th>
      <th v-if="data.action" scope="col" class="px-6 py-3">
        <span class="sr-only">Action</span>
      </th>
    </tr>
  </thead>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
    required: true,
  },
});
const desc = ref();
const sort = async (key) => {
  emit("sort", key);
};
const filter = () => {
  emit("filter");
};
const emit = defineEmits(["sort", "filter"]);
</script>
