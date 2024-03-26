import { KeyService, service, useApiMutation, useApiQuery } from "../services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";

export type DeleteItemInput = { id: string };
export type DeleteItemOutput = null;
export const useDeleteItemRepo = () => {
  const { mutate: deleteItem, ...rest } = useApiMutation<
    DeleteItemOutput,
    DeleteItemInput
  >({
    mutationKey: [KeyService.DELETE_ITEM],
    mutationFn: async ({ id }) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.delete<DeleteItemOutput>(`items/${id}`);
      return response.data;
    },
  });

  return { deleteItem, ...rest };
};
