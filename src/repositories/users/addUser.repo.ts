import { useQueryClient } from "@tanstack/react-query";
import { GetUserOutput } from "./getUserSelf.repo";
import { UserIdModel } from "@/models";
import { KeyService, service, useApiMutation } from "../services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";

export type AddUserInput = { data: UserIdModel };
export type AddUserOutput = UserIdModel;
export const useAddUserRepo = () => {
  const queryClient = useQueryClient();

  const { mutate: addUser, ...rest } = useApiMutation<
    AddUserOutput,
    AddUserInput
  >({
    mutationKey: [KeyService.CREATE_USER],
    mutationFn: async ({ data }) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.post<AddUserOutput, AddUserOutput>(
        "users",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<GetUserOutput>([KeyService.GET_USER_SELF], data);
    },
  });

  return { addUser, ...rest };
};
