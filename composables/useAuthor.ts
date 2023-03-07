import useAuthorAPI from "./useAuthorAPI";
import { AuthorTypes } from "~~/types/author";
export interface ListAuthorOptions {
  page?: number;
  limit?: number;
  filter?: any;
  search?: string;
}

export type ListAuthorRes = {
  message: string;
  data: {
    items: AuthorTypes.Record[];
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
};

export default () => {
  const authorApi = useAuthorAPI();
  // query: object, options: CustomUseFetchOptions
  const createItem = async () => {
    throw createError(NotImplementedError);
  };
  const getItem = async (id: string) => {
    if (!id) {
      throw createError(FieldRequiredError + "id");
    }
    return await authorApi.makeRequest(`api/authors/${id}`);
  };
  const updateItem = async (id: string, value: any) => {
    console.log(id, value);
  };
  const deleteItem = async (id: string) => {
    console.log(id);
  };
  const listItems = async (options: ListAuthorOptions) => {
    const { page = 1, limit = 20, filter = {}, search = "" } = options;
    const res = await authorApi.makeRequest(`api/authors`, {
      query: { page: page, limit: limit, filter: filter, search: search },
    });
    return res as ListAuthorRes;
  };

  return { createItem, getItem, updateItem, deleteItem, listItems };
};
