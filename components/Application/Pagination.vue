<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex items-center -space-x-px">
      <li>
        <a
          :class="
            isFirstPage
              ? 'pointer-events-none block px-3 py-2 ml-0 leading-tight text-gray-500 bg-gray-200 border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              : 'cursor-pointer block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          "
          @click="prev"
        >
          <span class="sr-only">Previous</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </li>
      <li class="p-2">
        <select
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="page-num"
          v-model.number="pageSelect"
        >
          <option
            v-for="pindex in pageCount > 1000 ? 1000 : pageCount"
            :key="pindex"
            :value="pindex"
          >
            {{ pindex }}
          </option>
        </select>
      </li>
      <li>
        <a
          :class="
            isLastPage
              ? 'pointer-events-none block px-3 py-2 ml-0 leading-tight text-gray-500 bg-gray-200 border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              : 'cursor-pointer block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          "
          @click="next"
        >
          <span class="sr-only">Next</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </li>
      <p class="p-2">Hiển thị</p>
      <li class="p-2">
        <select
          id="pageSize"
          v-model="pageSize"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          @change="changePageSize"
        >
          <option
            v-for="psize in [5, 10, 20, 50, 100]"
            :key="psize"
            :value="psize"
          >
            {{ psize }}
          </option>
        </select>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts" allowJs="true">
const props = defineProps({
  pageCount: {
    type: Number,
    default: 0,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 0,
    required: true,
  },
  page: {
    type: Number,
    default: 0,
    required: true,
  },
  isFirstPage: {
    type: Boolean,
    default: false,
    required: true,
  },
  isLastPage: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const pageSelect = ref(props.page);
const pageSize = ref(props.pageSize);
watch(pageSelect, () => {
  emit("pageChange", pageSelect.value);
});

const prev = async () => {
  pageSelect.value--;
  emit("prev");
};
const next = async () => {
  pageSelect.value++;
  emit("next");
};
const changePageSize = async () => {
  emit("pageSize", pageSize.value);
};
const emit = defineEmits(["pageChange", "pageSize", "prev", "next"]);
</script>
