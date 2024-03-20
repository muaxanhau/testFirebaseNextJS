import { devToolConfig } from "@/config";
import { CategoryIdModel } from "@/models";
import { utils } from "@/utils";
import { useApiQuery, KeyService, service } from "../services";

export type GetAllCategoriesOutput = CategoryIdModel[];
export const useGetAllCategoriesRepo = () => {
  const { data: categories, ...rest } = useApiQuery<GetAllCategoriesOutput>({
    queryKey: [KeyService.GET_ALL_CATEGORIES],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<GetAllCategoriesOutput>("categories");
      return response.data;
    },
  });

  return { categories, ...rest };
};
