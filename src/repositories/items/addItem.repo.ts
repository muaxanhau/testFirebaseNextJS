import { devToolConfig } from "@/config";
import {
  CategoryModel,
  CategoryIdModel,
  ItemModel,
  ItemIdModel,
} from "@/models";
import { utils } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation, KeyService, service } from "../services";

type AddItemProps = { onSuccess?: () => void } | void;
type AddItemInput = ItemModel;
type AddItemOutput = ItemIdModel;
export const useAddItemRepo = (props: AddItemProps) => {
  const queryClient = useQueryClient();

  const { mutate: addItem, ...rest } = useApiMutation<
    AddItemOutput,
    AddItemInput
  >({
    mutationKey: [KeyService.ADD_ITEM],
    mutationFn: async (data) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.post<AddItemOutput, AddItemInput>(
        "items",
        data
      );
      return response.data;
    },
    onSuccess: (category) => {
      if (typeof props === "undefined") return;
      props.onSuccess?.();
    },
  });
  return { addItem, ...rest };
};
