import { devToolConfig } from "@/config";
import { CategoryIdModel, ItemIdModel } from "@/models";
import { utils } from "@/utils";
import { useApiQuery, KeyService, service } from "../services";

export type GetCategoryWithAllItemsProps = {
  id: string;
};
export type GetCategoryWithAllItemsOutput = CategoryIdModel & {
  items: ItemIdModel[];
};
export const useGetCategoryWithAllItemsRepo = ({
  id,
}: GetCategoryWithAllItemsProps) => {
  const { data: categoryWithAllItems, ...rest } =
    useApiQuery<GetCategoryWithAllItemsOutput>({
      queryKey: [KeyService.GET_CATEGORY_WITH_ALL_ITEMS, id],
      queryFn: async () => {
        await utils.sleep(devToolConfig.delayFetching);

        const response = await service.get<GetCategoryWithAllItemsOutput>(
          `categories/${id}/items`
        );
        return response.data;
      },
    });

  return { categoryWithAllItems, ...rest };
};
