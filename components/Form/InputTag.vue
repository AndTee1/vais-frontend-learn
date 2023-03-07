<template>
  <div
    id="dropdownDefaultButton"
    data-dropdown-toggle="dropdown"
    class="border border-gray-300 px-4 py-2 rounded-lg flex cursor-pointer w-full"
  >
    <div class="w-full flex gap-2">
      <!-- <span v-for="(item, index) in dataselect" :key="item.id"> -->
      <span v-if="!dataselect.length" class="text-gray-400">{{
        placeholder
      }}</span>
      <FormChip
        v-if="dataselect.length"
        type="action"
        :id="dataselect[0].id"
        @click="cancel($event)"
      >
        <TableCellText>
          {{ dataselect[0][keyselect] }}
        </TableCellText>
      </FormChip>
      <FormChip
        v-if="dataselect.length > 1"
        :id="dataselect[1].id"
        type="action"
        @click="cancel($event)"
        ><TableCellText>
          {{ dataselect[1][keyselect] }}
        </TableCellText></FormChip
      >
      <FormChip
        v-if="dataselect.length > 2"
        :id="dataselect.length"
        type="normal"
        >+ {{ dataselect.length - 2 }}</FormChip
      >
      <!-- </span> -->
    </div>
    <div class="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 m-auto"
        viewBox="0 0 20 20"
        fill="#6B7280"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
  <!-- Dropdown menu -->
  <div
    id="dropdown"
    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 w-4/5"
    style="width: 76%"
  >
    <div aria-labelledby="dropdownDefaultButton">
      <div class="px-4">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
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
            :value="modelValue"
            @input="updateValue"
            id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tìm kiếm"
          />
        </div>
      </div>
      <ul
        v-if="option && option.length"
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
      >
        <li
          v-if="option.length !== dataselect.length"
          class="text-blue-500 px-4 py-2"
          @click="selectedAll"
        >
          Chọn tất cả
        </li>
        <li v-else class="text-red-500 px-4 py-2" @click="cancelAll">
          Bỏ chọn
        </li>
        <li
          class="px-4 py-2 flex"
          v-for="(item, index) in option"
          :key="index"
          :class="background(item) ? 'bg-gray-100' : ''"
          @click="selectedData(item)"
        >
          <span class="my-auto w-full">{{ item[keyselect] }}</span>
          <svg
            v-if="background(item)"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="my-auto"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.4891 3.51085C14.7258 3.74754 14.7258 4.13127 14.4891 4.36795L6.61029 12.2467C6.37361 12.4834 5.98987 12.4834 5.75319 12.2467L1.51076 8.00432C1.27408 7.76764 1.27408 7.3839 1.51076 7.14722C1.74744 6.91054 2.13118 6.91054 2.36786 7.14722L6.18174 10.9611L13.632 3.51085C13.8687 3.27417 14.2524 3.27417 14.4891 3.51085Z"
              fill="#1C64F2"
            />
          </svg>
        </li>
      </ul>
      <div
        v-else
        class="px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        Không tìm thấy kết quả nào
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  option: {
    type: Array,
    default: () => [],
  },
  keyselect: {
    type: String,
    default: "",
  },
  valueselect: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  selected: {
    type: Array,
    default: () => [],
  },
});
const dataselect = ref(
  props.option.filter((item) =>
    props.selected.includes(item[props.valueselect])
  )
);
const selectedData = (data) => {
  const find = dataselect.value.find((item) => item.id === data.id);
  if (find) {
    dataselect.value = dataselect.value.filter((item) => item.id !== find.id);
  } else {
    dataselect.value.push(data);
  }
};
const cancel = (id) => {
  dataselect.value = dataselect.value.filter((item) => item.id !== id);
};
const background = (item) => {
  const find = dataselect.value.find((tem) => item.id === tem.id);
  if (find) {
    return true;
  }
  return false;
};
const selectedAll = () => {
  dataselect.value = props.option;
};
const cancelAll = () => {
  dataselect.value = [];
};
watch(
  () => dataselect.value.length,
  () => {
    {
      emit("change", dataselect.value);
    }
  }
);
const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
const emit = defineEmits(["change", "update:modelValue"]);
</script>
