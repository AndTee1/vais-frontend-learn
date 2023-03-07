<template>
  <FilterByKeyWord />
  <FilterByStatus />
</template>
<script setup lang="ts">
import { useFilterByKeyWordStore } from "~~/stores/useFilterByKeyWordStore";

const filterStore = useFilterByKeyWordStore();
watch(filterStore, () => {
  const data = JSON.stringify(filterStore.$state);
  console.log("data filter", data);
});
</script>
