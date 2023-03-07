<template>
  <div class="input-container">
    <label
      v-if="title"
      :for="`input-${testId}`"
      :class="
        isDataValid
          ? 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          : 'block mb-2 text-sm font-medium text-red-700 dark:text-red-500'
      "
      >{{ title }}</label
    >

    <input
      :id="`input-${testId}`"
      :value="modelValue"
      :data-testid="`input-${testId}`"
      :type="type"
      :class="getClass()"
      :placeholder="placeHolder"
      required
      :autocomplete="autocomplete"
      :disabled="disabled"
      @input="updateValue"
    />
    <p
      v-if="invalidMessage && !isDataValid"
      class="mt-2 text-sm text-red-600 dark:text-red-500"
    >
      <span class="font-medium">Lỗi!</span> {{ invalidMessage }}.
    </p>
  </div>
</template>
<script setup>
const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  if (props.validator && props.type === "input") {
    isDataValid.value = props.validator(value);
  }
  if (!isDataValid.value && props.strict) {
    return;
  }
  emit("update:modelValue", event.target.value);
};
const isDataValid = ref(true);

const getClass = () => {
  const disabledClass =
    "mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const validClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const invalidClass =
    "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
  if (props.disabled) {
    return disabledClass;
  } else if (isDataValid.value) {
    return validClass;
  } else {
    return invalidClass;
  }
};

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  validator: {
    type: Function,
    default: null,
    required: true,
  },
  autocomplete: {
    type: String,
    default: "text",
  },
  title: {
    type: String,
    default: null,
  },
  strict: {
    type: Boolean,
    default: false,
  },
  invalidMessage: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeHolder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
    validator: (value) => {
      return ["text", "password", "number", "email", "file"].includes(value);
    },
  },
  testId: {
    type: String,
    default: "",
    required: true,
  },
});
</script>
