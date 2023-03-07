<template>
  <tbody>
    <tr
      v-for="(item, index) in bodydata"
      :key="index"
      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <td
        v-for="hearder in headerdata.data"
        :key="hearder.key"
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div
          v-if="hearder.type === 'rate'"
          :class="hearder.tdclass ? hearder.tdclass : ''"
        >
          <TableCellRating :rate="Number(item[hearder.key])" />
        </div>
        <div
          v-if="hearder.type === 'tags'"
          :class="hearder.tdclass ? hearder.tdclass : ''"
        >
          <TableCellTags
            :tags="item[hearder.key]"
            :keytag="hearder.value"
            :id="item.id"
          />
        </div>
        <div
          v-if="hearder.type === 'date'"
          :class="hearder.tdclass ? hearder.tdclass : ''"
        >
          {{
            item[hearder.key]
              .match(/([^T]+)/)[0]
              .split("-")
              .reverse()
              .join("/")
          }}
        </div>
        <div
          v-if="!hearder.type"
          :class="hearder.tdclass ? hearder.tdclass : ''"
        >
          <div v-if="item[hearder.key].length > 15">
            <TableCellText
              class="cells"
              :data-tooltip-target="item[hearder.key]"
            >
              {{ item[hearder.key] }}
            </TableCellText>
            <div
              :id="item[hearder.key]"
              role="tooltip"
              class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              {{ item[hearder.key] }}
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
          <div v-else>
            {{ item[hearder.key] }}
          </div>
        </div>
      </td>
      <td
        v-if="headerdata.action"
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div class="flex">
          <button class="mx-2" @click="editRow(item.id)">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5074 15.1667H1.91304C1.75929 15.1667 1.61184 15.1056 1.50312 14.9969C1.39441 14.8882 1.33333 14.7407 1.33333 14.587C1.33333 14.4332 1.39441 14.2858 1.50312 14.177C1.61184 14.0683 1.75929 14.0072 1.91304 14.0072H13.5074C13.6611 14.0072 13.8086 14.0683 13.9173 14.177C14.026 14.2858 14.0871 14.4332 14.0871 14.587C14.0871 14.7407 14.026 14.8882 13.9173 14.9969C13.8086 15.1056 13.6611 15.1667 13.5074 15.1667Z"
                fill="#6B7280"
              />
              <path
                d="M8.04991 4.15208L3.24233 8.95966C3.168 9.03403 3.1153 9.12721 3.08987 9.22923L1.91304 12.8478L5.53163 11.671C5.63365 11.6456 5.72683 11.5929 5.8012 11.5185L10.6088 6.71095L8.04991 4.15208Z"
                fill="#6B7280"
              />
              <path
                d="M12.7578 3.74222L11.0186 2.00308C10.9099 1.8944 10.7625 1.83334 10.6088 1.83334C10.4551 1.83334 10.3076 1.8944 10.1989 2.00308L8.86963 3.33236L11.4285 5.89123L12.7578 4.56194C12.8665 4.45323 12.9275 4.3058 12.9275 4.15208C12.9275 3.99836 12.8665 3.85094 12.7578 3.74222Z"
                fill="#6B7280"
              />
            </svg>
          </button>
          <button
            :data-modal-target="`delete-${item.id}`"
            :data-modal-toggle="`delete-${item.id}`"
          >
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.48335 13.6189C3.51468 14.0388 3.70324 14.4314 4.01138 14.7183C4.31951 15.0052 4.72454 15.1653 5.14557 15.1667H10.8545C11.2755 15.1653 11.6805 15.0052 11.9887 14.7183C12.2968 14.4314 12.4854 14.0388 12.5167 13.6189L13.0411 6.27779H2.95891L3.48335 13.6189Z"
                fill="#E02424"
              />
              <path
                d="M14.1111 4.05557H10.7778V2.3889C10.7778 2.24156 10.7192 2.10025 10.6151 1.99606C10.5109 1.89188 10.3696 1.83334 10.2222 1.83334H5.77778C5.63044 1.83334 5.48913 1.89188 5.38494 1.99606C5.28076 2.10025 5.22222 2.24156 5.22222 2.3889V4.05557H1.88889C1.74155 4.05557 1.60024 4.1141 1.49605 4.21828C1.39187 4.32247 1.33334 4.46378 1.33334 4.61112C1.33334 4.75846 1.39187 4.89977 1.49605 5.00396C1.60024 5.10815 1.74155 5.16668 1.88889 5.16668H14.1111C14.2585 5.16668 14.3998 5.10815 14.504 5.00396C14.6081 4.89977 14.6667 4.75846 14.6667 4.61112C14.6667 4.46378 14.6081 4.32247 14.504 4.21828C14.3998 4.1141 14.2585 4.05557 14.1111 4.05557ZM6.33334 2.94445H9.66667V4.05557H6.33334V2.94445Z"
                fill="#E02424"
              />
            </svg>
          </button>
          <div
            :id="`delete-${item.id}`"
            tabindex="-1"
            class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
          >
            <div class="relative w-full h-full max-w-md md:h-auto">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  :data-modal-hide="`delete-${item.id}`"
                >
                  <svg
                    aria-hidden="true"
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
                  <span class="sr-only">Close modal</span>
                </button>
                <div class="p-6 text-center">
                  <svg
                    class="mx-auto"
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="72" height="72" rx="36" fill="#FDE8E8" />
                    <path
                      d="M36 17.25C32.2916 17.25 28.6665 18.3497 25.5831 20.4099C22.4996 22.4702 20.0964 25.3986 18.6773 28.8247C17.2581 32.2508 16.8868 36.0208 17.6103 39.6579C18.3338 43.2951 20.1195 46.636 22.7418 49.2582C25.364 51.8805 28.7049 53.6662 32.3421 54.3897C35.9792 55.1132 39.7492 54.7419 43.1753 53.3227C46.6014 51.9036 49.5298 49.5004 51.5901 46.4169C53.6503 43.3335 54.75 39.7084 54.75 36C54.7356 31.0316 52.7555 26.2709 49.2423 22.7577C45.7291 19.2445 40.9684 17.2644 36 17.25V17.25ZM43.7344 41.525L41.525 43.7344L36 38.2094L30.475 43.7344L28.2656 41.525L33.7906 36L28.2656 30.475L30.475 28.2656L36 33.7906L41.525 28.2656L43.7344 30.475L38.2094 36L43.7344 41.525Z"
                      fill="#E02424"
                    />
                  </svg>
                  <h2 class="my-4 font-bold text-xl text-gray-800">Xóa sách</h2>
                  <h3 class="mb-5 text-sm font-normal text-gray-500">
                    Sách bị xóa sẽ không thể khôi phục
                  </h3>
                  <div class="flex justify-between">
                    <button
                      :data-modal-hide="`delete-${item.id}`"
                      type="button"
                      class="w-full mx-2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      Quay lại
                    </button>
                    <button
                      :data-modal-hide="`delete-${item.id}`"
                      @click="deleteRow(item.id)"
                      type="button"
                      class="w-full mx-2 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
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
    required: true,
  },
});
const editRow = ($event) => {
  emit("edit", $event);
};
const deleteRow = ($event) => {
  emit("delete", $event);
};
const emit = defineEmits(["edit", "delete"]);
</script>
