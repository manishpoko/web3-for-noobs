//this hook does the work of fetching the latest article and also making it reusable anywhere

import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../config";
import type { LocalPostType } from "../pages/CategoryPage";

export const useLatestArticle = () => {
  //usequery to fetch data object and return it
  const result = useQuery<LocalPostType[]>({
    queryKey: ["posts", "latest"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/posts?limit=3`);
      if (!res.ok) {
        throw new Error(`failed to fetch latest: ${res.statusText} `);
      }
      return res.json();
    },
  });
  return result;
};
