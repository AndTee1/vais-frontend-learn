<template>
  <button
    ref="mybutton"
    type="button"
    style="position: relative"
    :data-testid="`button-${testId}`"
    :class="
      !loadingIndicator
        ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        : 'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center'
    "
    :disabled="loadingIndicator"
    @click="buttonClicked"
  >
    <slot />
  </button>
</template>

<script setup>
const mybutton = ref(null);

const emit = defineEmits(["click"]);
const loading = useVaisLoading();
const loadingIndicator = ref(false);
const props = defineProps({
  testId: {
    type: String,
    default: "mybutton",
    required: true,
  },
  handler: {
    type: Function,
    default: () => {},
    required: true,
  },
  loadingGlobal: {
    type: Boolean,
    default: false,
  },
  disableLoading: {
    type: Boolean,
    default: false,
  },
  loadingContainer: {
    type: Object,
    default: null,
  },
});

const defaultHandle = async () => {
  emit("click");
};

const showLoading = () => {
  loadingIndicator.value = true;
  loading.show();
};

const hideLoading = () => {
  loadingIndicator.value = false;
  loading.hide();
};

const buttonClicked = async () => {
  if (props.handler) {
    showLoading();
    try {
      await props.handler();
    } catch (error) {
      throw error;
    } finally {
      hideLoading();
    }
  } else {
    await defaultHandle();
  }
};
</script>
