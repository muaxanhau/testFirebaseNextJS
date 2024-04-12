import { KeyService, service, useApiMutation } from "../services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";
import { useQueryClient } from "@tanstack/react-query";

type DeleteItemProps = { categoryId: string };
type DeleteItemInput = { itemId: string };
type DeleteItemOutput = null;
export const useDeleteItemRepo = ({ categoryId }: DeleteItemProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteItem, ...rest } = useApiMutation<
    DeleteItemOutput,
    DeleteItemInput
  >({
    mutationKey: [KeyService.DELETE_ITEM],
    mutationFn: async ({ itemId }) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.delete<DeleteItemOutput>(
        `items/${itemId}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KeyService.GET_CATEGORY_WITH_ALL_ITEMS, categoryId],
      });
    },
  });

  return { deleteItem, ...rest };
};
