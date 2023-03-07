<template>
  <button
    type="button"
    data-modal-target="FliterModal"
    data-modal-toggle="FliterModal"
    class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mx-2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
        clip-rule="evenodd"
      />
    </svg>
    Bộ lọc
  </button>
  <div
    id="FliterModal"
    data-modal-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
  >
    <div class="relative w-full h-full max-w-2xl md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Bộ lọc sách
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="FliterModal"
          >
            <svg
              class="w-5 h-5"
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
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <div class="flex border-b border-gray-200 py-6">
            <div class="w-1/5 my-auto">Tác giả</div>
            <FormInputTag
              v-if="loaded"
              v-model="searchAuthor"
              :option="authorList"
              :selected="filterselected.author_id"
              keyselect="name"
              valueselect="author_id"
              placeholder="Chọn tác giả"
              @change="selectedAuthor($event)"
            />
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            type="button"
            class="text-gray-500 mx-2 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Hủy
          </button>
          <div class="flex">
            <button
              type="button"
              class="text-gray-500 mx-2 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Bỏ lọc
            </button>
            <button
              data-modal-hide="FliterModal"
              type="button"
              class="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="filterData"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAuthor, {
  ListAuthorOptions,
  ListAuthorRes,
} from "~~/composables/useAuthor";
import { AuthorTypes } from "~~/types/author";
interface Record {
  author_id: string;
  name: string;
  author_link: string;
  _textSearch: string;
}
const props = defineProps({
  filterselected: {
    type: Object,
    default: () => {},
  },
});
const loaded = ref(false);
const authorList = ref<AuthorTypes.Record[]>([]);
const authorComp = useAuthor();
const valueAuthor = ref([]);
const searchAuthor = ref("");
const fetchAuthor = async (fetchOptions: ListAuthorOptions) => {
  const res = await authorComp.listItems(fetchOptions);
  authorList.value = res.data.items;
  return res.data.total;
};
const authorPagingComp = useVaisPaging({
  pageName: "author",
  resetStore: false,
  onChange: fetchAuthor,
  updateUrl: false,
});
const selectedAuthor = (data: any) => {
  // valueAuthor.value = data;
  if (data.length) {
    data.map((item: Record) => valueAuthor.value.push(item.author_id));
  } else {
    valueAuthor.value = [];
  }
};
watch(
  () => searchAuthor.value,
  () => {
    {
      authorPagingComp.setSearch(searchAuthor.value);
    }
  }
);
onMounted(async () => {
  try {
    loaded.value = false;
    await authorPagingComp.setLimit(10);
    loaded.value = true;
    // await bookPagingComp.fireCallback();
  } catch (error) {
    throw error;
  }
});
const filterData = () => {
  emit("filter", { author: valueAuthor.value });
};
const emit = defineEmits(["filter", "search"]);
</script>
