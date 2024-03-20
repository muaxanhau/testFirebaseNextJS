import { devToolConfig } from "@/config";
import { CartIdModel, ItemIdModel } from "@/models";
import { Prettify, utils } from "@/utils";
import { useApiQuery, KeyService, service } from "../services";

export type GetAllUserCartsOutput = Prettify<
  Omit<CartIdModel, "userId" | "itemId"> & {
    item: ItemIdModel;
  }
>[];
export const useGetAllUserCartsRepo = () => {
  const { data: carts, ...rest } = useApiQuery<GetAllUserCartsOutput>({
    queryKey: [KeyService.GET_ALL_USER_CARTS],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<GetAllUserCartsOutput>("carts");

      return response.data;
    },
  });

  return { carts, ...rest };
};
