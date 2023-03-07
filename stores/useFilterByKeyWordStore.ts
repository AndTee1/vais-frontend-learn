export type FilterByKeyWordType = {
  search: string;
  persistantSearch: string;
  categories: string[];
  priceFrom: number;
  priceTo: number;
  shippingMethods: string[];
  rating: string;
};

export const useFilterByKeyWordStore = defineStore("filter_by_keyword", () => {
  const search = ref<string | null>("");
  const persistantSearch = useLocalStorage("mysearch", "");
  const categories = ref<string[]>([]);
  const priceFrom = ref<number>(500);
  const priceTo = ref<number>(5000);
  const shippingMethods = ref<string[]>([]);
  const status = ref<string[]>([]);

  return {
    search,
    categories,
    priceFrom,
    priceTo,
    shippingMethods,
    status,
    persistantSearch,
  };
});
