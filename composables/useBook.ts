import useBookAPI from "./useBookAPI";
import { BookTypes } from "~~/types/book";
export interface ListBookOptions {
  page?: number;
  limit?: number;
  filter?: any;
  search?: string;
}

export type ListBookRes = {
  message: string;
  data: {
    items: BookTypes.Record[];
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
};

export default () => {
  const bookApi = useBookAPI();
  // query: object, options: CustomUseFetchOptions
  const createItem = async () => {
    throw createError(NotImplementedError);
  };
  const getItem = async (id: string) => {
    if (!id) {
      throw createError(FieldRequiredError + "id");
    }
    return await bookApi.makeRequest(`api/books/${id}`);
  };
  const updateItem = async (id: string, value: any) => {
    console.log(id, value);
  };
  const deleteItem = async (id: string) => {
    console.log(id);
    const res = await bookApi.makeRequest(`api/books/${id}`, {
      method: "DELETE",
    });
    return res;
  };
  const listItems = async (options: ListBookOptions) => {
    const { page = 1, limit = 20, filter = {}, search = "" } = options;
    const res = await bookApi.makeRequest(`api/books`, {
      query: { page: page, limit: limit, filter: filter, search: search },
    });
    return res as ListBookRes;
  };

  return { createItem, getItem, updateItem, deleteItem, listItems };
};
