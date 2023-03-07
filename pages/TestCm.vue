<template>
  <div>
    <vue-select
      v-model="value"
      :options="[{ color: 'Red' }, { color: 'Green' }]"
      label-by="color"
    >
    </vue-select>
  </div>
</template>
<script setup lang="ts">
import VueSelect from "vue-next-select";
const value = ref([]);
</script>
