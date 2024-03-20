import { devToolConfig } from "@/config";
import { CategoryModel, CategoryIdModel } from "@/models";
import { utils } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation, KeyService, service } from "../services";
import { GetAllCategoriesOutput } from "./getAllCategories.repo";

type AddCategoryProps = { onSuccess?: () => void } | void;
type AddCategoryInput = CategoryModel;
type AddCategoryOutput = CategoryIdModel;
export const useAddCategoryRepo = (props: AddCategoryProps) => {
  const queryClient = useQueryClient();

  const { mutate: addCategory, ...rest } = useApiMutation<
    AddCategoryOutput,
    AddCategoryInput
  >({
    mutationKey: [KeyService.ADD_CATEGORY],
    mutationFn: async (data) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.post<AddCategoryOutput, AddCategoryInput>(
        "categories",
        data
      );
      return response.data;
    },
    onSuccess: (category) => {
      queryClient.setQueryData<GetAllCategoriesOutput>(
        [KeyService.GET_ALL_CATEGORIES],
        (oldData) => (oldData ? [category, ...oldData] : oldData)
      );
      queryClient.invalidateQueries({
        queryKey: [KeyService.GET_ALL_CATEGORIES],
      });

      if (typeof props === "undefined") return;
      props.onSuccess?.();
    },
  });
  return { addCategory, ...rest };
};
