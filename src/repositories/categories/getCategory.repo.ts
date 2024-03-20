import { devToolConfig } from "@/config";
import { CategoryIdModel } from "@/models";
import { utils } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { KeyService, useApiQuery, service } from "../services";
import { GetAllCategoriesOutput } from "./getAllCategories.repo";

export type GetCategoryProps = { id: string };
export type GetCategoryOutput = CategoryIdModel;
export const useGetCategoryRepo = ({ id }: GetCategoryProps) => {
  const queryClient = useQueryClient();
  const localCategory = queryClient
    .getQueryData<GetAllCategoriesOutput>([KeyService.GET_ALL_CATEGORIES])
    ?.find((category) => category.id === id);

  const { data: category, ...rest } = useApiQuery<GetCategoryOutput>({
    queryKey: [KeyService.GET_CATEGORY, id],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<CategoryIdModel>(`categories/${id}`);
      return response.data;
    },
    initialData: localCategory,
  });

  return { category, ...rest };
};
