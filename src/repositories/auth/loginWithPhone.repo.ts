import {
  UserCredential,
  ConfirmationResult,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useAddUserRepo } from "../users";
import { KeyService, auth, useApiMutation } from "../services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";
import { RoleEnum } from "@/models";

type LoginWithPhoneProps = {
  onSuccess?: (data: LoginWithPhoneOutput) => void;
} | void;
type LoginWithPhoneInput = { phone: string };
type LoginWithPhoneOutput = ConfirmationResult;
export const useLoginWithPhoneRepo = (props: LoginWithPhoneProps) => {
  const { mutate: loginWithPhone, ...rest } = useApiMutation<
    LoginWithPhoneOutput,
    LoginWithPhoneInput
  >({
    mutationKey: [KeyService.LOGIN_WITH_PHONE],
    mutationFn: async ({ phone }) => {
      await utils.sleep(devToolConfig.delayFetching);

      // const confirmation = await signInWithPhoneNumber(auth, phone, {});
      return null as any;
    },
    ...props,
  });

  return { loginWithPhone, ...rest };
};
