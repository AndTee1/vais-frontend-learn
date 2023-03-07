<template>
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

  <div class="ml-40 mr-40 relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex items-center justify-between pb-4">
      <div class="flex">
        <!-- <BookFilterAuthor />
        <BookFilterYear class="ml-3" /> -->
      </div>

      <label for="table-search" class="sr-only">Search</label>
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
          class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for items"
        />
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Image</span>
          </th>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">Rating</th>
        </tr>
      </thead>
      <tbody v-if="bookList">
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="(book, bookIndex) in bookList.data.items"
          :key="bookIndex"
        >
          <td class="w-32 p-4">
            <img :src="book.cover_link" :alt="book.author" />
          </td>
          <td class="px-6 py-4 text-gray-900 dark:text-white">
            {{ book.title }}
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center space-x-3">
              {{ book.description }}
            </div>
          </td>
          <td class="px-6 py-4">
            <a
              href="#"
              class="font-medium text-red-600 dark:text-red-500 hover:underline"
              >{{ book.average_rating }}</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import useBook, { ListBookOptions, ListBookRes } from "~~/composables/useBook";
import { initDropdowns } from "flowbite";
// import BookFilterAuthor from "~~/components/BookFilterAuthor.vue";

const booksComp = useBook();
const bookList = ref<ListBookRes>();

const fetchData = async (fetchOptions: ListBookOptions) => {
  const res = await booksComp.listItems(fetchOptions);
  bookList.value = res;
  return res.data.total;
};

const bookPagingComp = useVaisPagingAndFilterWithSearchParams({
  pageName: "guideline-mybooks",
  resetStore: false,
  onChange: fetchData,
});

onMounted(async () => {
  initDropdowns();
  try {
    await bookPagingComp.setLimit(30);
    // await bookPagingComp.fireCallback();
  } catch (error) {
    throw error;
  }
});
</script>
