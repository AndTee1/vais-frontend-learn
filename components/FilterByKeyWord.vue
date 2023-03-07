<template>
  <div class="flex items-center justify-center p-4">
    <button
      id="dropDownFilterByKeyword1"
      data-dropdown-toggle="dropdownFilterByKeyword1"
      class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      type="button"
    >
      Filter by keywords
      <svg
        class="w-4 h-4 ml-2"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      id="dropdownFilterByKeyword1"
      class="z-10 hidden px-3 pt-1 bg-white rounded-lg shadow w-80 dark:bg-gray-700"
    >
      <div class="flex items-center justify-between pt-2">
        <h6 class="text-sm font-medium text-black dark:text-white">Filters</h6>
      </div>
      <div class="pt-3 pb-2">
        <label for="input-group-search" class="sr-only">Search</label>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
            id="input-group-search"
            v-model="filterStore.persistantSearch"
            class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Search keywords..."
          />
        </div>
      </div>
      <div
        id="accordion-flush"
        data-accordion="collapse"
        data-active-classes="text-black dark:text-white"
        data-inactive-classes="text-gray-500 dark:text-gray-400"
      >
        <!-- Category -->
        <h2 id="category-heading">
          <button
            type="button"
            class="flex items-center justify-between w-full py-2 px-1.5 text-sm font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            data-accordion-target="#category-body"
            aria-expanded="true"
            aria-controls="category-body"
          >
            <span>Category</span>
            <svg
              aria-hidden="true"
              data-accordion-icon
              class="w-5 h-5 rotate-180 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              ></path>
            </svg>
          </button>
        </h2>
        <div
          id="category-body"
          class="hidden"
          aria-labelledby="category-heading"
        >
          <div
            class="py-2 font-light border-b border-gray-200 dark:border-gray-600"
          >
            <ul class="space-y-2">
              <li
                v-for="(cat, catindex) in categories"
                class="flex items-center"
                :key="catindex"
              >
                <input
                  :id="cat.key"
                  type="checkbox"
                  v-model="filterStore.categories"
                  :value="cat.key"
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />

                <label
                  :for="cat.key"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ cat.label }}
                </label>
              </li>
            </ul>
          </div>
        </div>

        <!-- Price -->
        <h2 id="price-heading">
          <button
            type="button"
            class="flex items-center justify-between w-full py-2 px-1.5 text-sm font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            data-accordion-target="#price-body"
            aria-expanded="true"
            aria-controls="price-body"
          >
            <span>Price</span>
            <svg
              aria-hidden="true"
              data-accordion-icon
              class="w-5 h-5 rotate-180 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              ></path>
            </svg>
          </button>
        </h2>
        <div id="price-body" class="hidden" aria-labelledby="price-heading">
          <div
            class="flex items-center py-2 space-x-3 font-light border-b border-gray-200 dark:border-gray-600"
          >
            <select
              id="price-from"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              v-model="filterStore.priceFrom"
            >
              <option disabled selected>From</option>
              <option
                v-for="(price, index) in priceList"
                :value="price.value"
                :key="index"
              >
                {{ price.label }}
              </option>
            </select>

            <select
              id="price-to"
              v-model="filterStore.priceTo"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option disabled selected>To</option>
              <option
                v-for="(price, index) in priceList"
                :value="price.value"
                :key="index"
              >
                {{ price.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Worldwide Shipping -->
        <h2 id="worldwide-shipping-heading">
          <button
            type="button"
            class="flex items-center justify-between w-full py-2 px-1.5 text-sm font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            data-accordion-target="#worldwide-shipping-body"
            aria-expanded="true"
            aria-controls="worldwide-shipping-body"
          >
            <span>Worldwide Shipping</span>
            <svg
              aria-hidden="true"
              data-accordion-icon
              class="w-5 h-5 rotate-180 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              ></path>
            </svg>
          </button>
        </h2>
        <div
          id="worldwide-shipping-body"
          class="hidden"
          aria-labelledby="worldwide-shipping-heading"
        >
          <div
            class="py-2 space-y-2 font-light border-b border-gray-200 dark:border-gray-600"
          >
            <label
              :key="index"
              v-for="(shipping, index) in worldWideShippingList"
              class="relative flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                :value="shipping.key"
                class="sr-only peer"
                v-model="filterStore.shippingMethods"
              />
              <div
                class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"
              ></div>
              <span
                class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >{{ shipping.label }}</span
              >
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" allowJs="true">
import { useFilterByKeyWordStore } from "../stores/useFilterByKeyWordStore";

import { initAccordions, initDropdowns } from "flowbite";
const categories = [
  { key: "apple", label: "Apple (56)" },
  { key: "microsoft", label: "Microsoft (45)" },
  { key: "logitec", label: "Logitech (97)" },
  { key: "sony", label: "Sony (234)" },
];
const priceList = [
  { value: 500, label: "$500" },
  { value: 2500, label: "$2500" },
  { value: 5000, label: "$5000" },
];
const worldWideShippingList = [
  { key: "north_america", label: "North America" },
  { key: "south_america", label: "South America" },
  { key: "asia", label: "Asia" },
  { key: "aus", label: "Australia" },
];

const filterStore = useFilterByKeyWordStore();

onMounted(() => {
  initAccordions();
  initDropdowns();
});
</script>
