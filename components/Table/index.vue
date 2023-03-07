<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <TableHeader :data="headerdata" @sort="sort($event)" />
      <TableTbody
        :headerdata="headerdata"
        :bodydata="bodydata"
        @delete="deleteRow($event)"
        @edit="editRow($event)"
      />
    </table>
  </div>
</template>
<script setup>
const props = defineProps({
  headerdata: {
    type: Object,
    default: () => {},
    required: true,
  },
  bodydata: {
    type: Array,
    default: () => [],
  },
});

const dataTabel = ref();
watch(
  () => props.bodydata,
  () => {
    {
      dataTabel.value = props.bodydata;
    }
  }
);

const sort = ($event) => {
  emit("sort", $event);
};
const editRow = ($event) => {
  emit("edit", $event);
};
const deleteRow = ($event) => {
  emit("delete", $event);
};
const emit = defineEmits(["sort", "filter", "edit", "delete"]);
</script>
