<template>
  <div class="grid grid-cols-1 gap-0 sm:grid-cols-6 p-10">
    <div style="position: relative" class="mb-3 col-span-2 px-5">
      <div>
        <ul class="space-y-1 max-w-md list-disc list-inside">
          <li v-for="item in listBooks" :key="item.id">
            <NuxtLink
              :key="item.id"
              :to="`/5-routing/${item.id}`"
              active-class="text-blue-500"
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-span-4 mb-3">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
const loading = useVaisLoading();
const bookComp = useBook();
const listBooks = ref([]);

definePageMeta({
  layout: "custom",
});

const getListBooks = async () => {
  const res = await bookComp.listItems({});
  return res.data.items;
};

const reloadData = async () => {
  loading.show();
  try {
    listBooks.value = await getListBooks();
  } catch (error) {
    throw error;
  } finally {
    loading.hide();
  }
};

onMounted(async () => {
  await reloadData();
});
</script>
