import { apiClient } from "./client.ts";

export const searchApi = {
  search_by_category: async (url:string,body:Object) => {
    const {data} = await apiClient.post(url,body);
    return data.search
  },
} 