import { devToolConfig } from "@/config";
import { CartIdModel, ItemIdModel, UserIdModel } from "@/models";
import { Prettify, utils } from "@/utils";
import { useApiQuery, KeyService, service } from "../services";

export type GetAllCartsOutput = Prettify<
  Omit<CartIdModel, "userId" | "itemId"> & {
    item: ItemIdModel;
    user: UserIdModel;
  }
>[];
export const useGetAllCartsRepo = () => {
  const { data: carts, ...rest } = useApiQuery<GetAllCartsOutput>({
    queryKey: [KeyService.GET_ALL_CARTS],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<GetAllCartsOutput>("carts/all");

      return response.data;
    },
  });

  return { carts, ...rest };
};
