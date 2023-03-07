<template>
  <div name="header" class="w-full flex justify-between px-4">
    <div class="text-2xl bold text-gray-900">Quản lý sách</div>
    <div>
      <div class="flex items-center justify-between pb-4">
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            :value="bookPagingComp.search.value"
            @change="bookPagingComp.setSearch($event.target?.value)"
            class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="tìm kiếm"
          />
        </div>
        <FilterModel
          :filterselected="bookPagingComp.filter.value"
          @filter="filterData($event)"
        />

        <button
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            /></svg
          >Thêm mới
        </button>
      </div>
    </div>
  </div>
  <Table
    :headerdata="headerTable"
    :bodydata="bookList"
    @sort="sortCell($event)"
    @delete="deleteByID($event)"
  />
  <div class="ml-40">
    <ApplicationPagination
      :page-count="
        bookPagingComp.pageCount.value > 1000
          ? 1000
          : bookPagingComp.pageCount.value
      "
      :page="bookPagingComp.page.value"
      :is-first-page="bookPagingComp.isFirstPage.value"
      :is-last-page="bookPagingComp.isLastPage.value"
      :page-size="bookPagingComp.limit.value"
      @next="bookPagingComp.next"
      @prev="bookPagingComp.prev"
      @page-change="bookPagingComp.setPage"
      @page-size="bookPagingComp.setLimit"
    />
  </div>
</template>

<script setup lang="ts">
// definePageMeta({
//   layout: "custom",
// });
import useBook, { ListBookOptions, ListBookRes } from "~~/composables/useBook";
import { initDropdowns, initTooltips, initModals } from "flowbite";
import { BookTypes } from "~~/types/book";
interface filterModel {
  author: Array<string> | string;
}
//import BookFilterAuthor from "~~/components/BookFilterAuthor.vue";
const booksComp = useBook();
const bookList = ref<BookTypes.Record[]>();
const bookData = ref([]);
let desc = true;
const loaded = ref(false);
const headerTable = {
  data: [
    { key: "book_id", name: "Mã sách", sort: true },
    {
      key: "title",
      name: "Tên sách",
      sort: true,
      tdclass: "text-blue-500",
      tooltip: true,
    },
    {
      key: "author",
      name: "Tác giả",
      sort: true,
      filter: true,
      tdclass: "text-blue-500",
      tooltip: true,
    },
    { key: "publisher", name: "Nhà sản xuất", sort: true, filter: true },
    {
      key: "genre_and_votes",
      name: "Thể loại",
      filter: true,
      type: "tags",
      value: "genre",
    },
    { key: "review_count", name: "Số bình luận", sort: true, filter: true },
    { key: "number_of_pages", name: "Số Trang", sort: true, filter: true },
    {
      key: "year_publish",
      name: "Ngày xuất bản",
      sort: true,
      filter: true,
      type: "date",
    },
    {
      key: "average_rating",
      name: "Đánh giá",
      filter: true,
      type: "rate",
    },
  ],
  action: true,
};
const fetchData = async (fetchOptions: ListBookOptions) => {
  const res = await booksComp.listItems(fetchOptions);
  bookList.value = res.data.items;
  return res.data.total;
};

const bookPagingComp = useVaisPaging({
  pageName: "mybooks",
  resetStore: false,
  onChange: fetchData,
  updateUrl: true,
});

const filterData = (obj: filterModel) => {
  bookPagingComp.setFilter({ author_id: obj.author });
};

onMounted(async () => {
  try {
    loaded.value = false;
    await bookPagingComp.setLimit(10);
    initTooltips();
    initModals();
    initDropdowns();
    loaded.value = true;
    // await bookPagingComp.fireCallback();
  } catch (error) {
    throw error;
  }
});
const deleteByID = async (id: string) => {
  const res = await booksComp.deleteItem(id);
  if (res) {
    await bookPagingComp.setLimit(10);
  }
};
const sortCell = (event: string) => {
  if (!event) return;
  bookList.value = bookList.value?.sort((a: any, b: any) =>
    desc
      ? a[event].localeCompare(b[event], undefined, {
          numeric: true,
          sensitivity: "base",
        })
      : b[event].localeCompare(a[event], undefined, {
          numeric: true,
          sensitivity: "base",
        })
  );
  desc = !desc;
};
</script>
