import { ParallelRequests } from "@truongdq54/vaislib-nuxt/dist/runtime/composables/useVaisApi";
import { CustomUseFetchOptions } from "@truongdq54/vaislib-nuxt/dist/runtime/composables/useVaisRESTFul";
/*
 * This composable is basically a reimplemented version of the useAPI
 * it only override the baseURL to a specific appliation so that we don't have to
 * pass the baseURL for every request
 */
export default () => {
  const api = useVaisApi();
  const config = useRuntimeConfig();

  const makeRequest = async (
    url: string,
    options: CustomUseFetchOptions<unknown> = {}
  ) => {
    const myoptions = {
      ...options,
      baseURL: "https://backend-guideline-api.vais.vn/",
    } as CustomUseFetchOptions<unknown>;
    return await api.makeRequest(url, myoptions);
  };

  const makeRequestParallel = async (requestsInfo: ParallelRequests[]) => {
    const newRequestInfo = requestsInfo.map((rinfo) => {
      const newrinfo = { ...rinfo } as ParallelRequests;
      newrinfo.options.baseURL = "https://backend-guideline-api.vais.vn/";
      return newrinfo;
    });
    return await api.makeRequestParallel(newRequestInfo);
  };
  return { makeRequest, makeRequestParallel };
};
