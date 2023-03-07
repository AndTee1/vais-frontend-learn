<template>
  <section class="bg-white dark:bg-gray-900">
    <div
      class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6"
    >
      <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
        <h2
          class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
        >
          {{ book?.title }}
        </h2>
        <p class="mb-4">
          {{ book?.description }}
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-8">
        <img
          class="w-full rounded-lg"
          :src="book?.cover_link"
          alt="office content 1"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts" allowJs="true">
import { BookTypes } from "../../../../packages/backend-guideline/src/app/modules/books/type";

const route = useRoute();
const bookComp = useBook();
const book = ref<BookTypes.Record | null>();
onMounted(async () => {
  const res = await bookComp.getItem(route.params.bookSlug as string);
  book.value = res.data.record;
});
</script>
