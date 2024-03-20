import { devToolConfig } from "@/config";
import { CategoryIdModel, CategoryModel } from "@/models";
import { utils } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation, KeyService, service } from "../services";
import { GetAllCategoriesOutput } from "./getAllCategories.repo";

type EditCategoryProps = { onSuccess: () => void } | void;
type EditCategoryInput = CategoryIdModel;
type EditCategoryOutput = null;
export const useEditCategoryRepo = (props: EditCategoryProps) => {
  const queryClient = useQueryClient();

  const { mutate: editCategory, ...rest } = useApiMutation<
    EditCategoryOutput,
    EditCategoryInput
  >({
    mutationKey: [KeyService.EDIT_CATEGORY],
    mutationFn: async ({ id, name, description, image }) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.put<EditCategoryOutput, CategoryModel>(
        `categories/${id}`,
        {
          name,
          description,
          image,
        }
      );
      return response.data;
    },
    onMutate: ({ id, name, description, image }) => {
      queryClient.setQueryData<GetAllCategoriesOutput>(
        [KeyService.GET_ALL_CATEGORIES],
        (oldData) => {
          if (!oldData) return oldData;

          const editedItemCategories: GetAllCategoriesOutput = oldData.map(
            (category) => {
              if (category.id !== id) return category;

              return {
                ...category,
                name,
                description,
                image,
              };
            }
          );
          return editedItemCategories;
        }
      );
    },
    onSettled: (_1, _2, { id }) => {
      queryClient.invalidateQueries({
        queryKey: [KeyService.GET_ALL_CATEGORIES],
      });
      queryClient.invalidateQueries({
        queryKey: [KeyService.GET_CATEGORY, id],
      });
    },
    ...props,
  });
  return { editCategory, ...rest };
};
