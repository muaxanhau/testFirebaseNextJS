import { UserCredential, ConfirmationResult } from "firebase/auth";
import { useAddUserRepo } from "../users";
import { KeyService, useApiMutation } from "../services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";
import { RoleEnum } from "@/models";

type ConfirmOtpProps = { onSuccess?: () => void } | void;
type ConfirmOtpInput = {
  confirmation: ConfirmationResult;
  otp: string;
};
type ConfirmOtpOutput = UserCredential | null;
export const useConfirmOtpRepo = (props: ConfirmOtpProps) => {
  const { addUser } = useAddUserRepo();

  const { mutate: confirmOtp, ...rest } = useApiMutation<
    ConfirmOtpOutput,
    ConfirmOtpInput
  >({
    mutationKey: [KeyService.CONFIRM_OTP],
    mutationFn: async ({ confirmation, otp }) => {
      await utils.sleep(devToolConfig.delayFetching);

      const user = await confirmation.confirm(otp);
      return user;
    },
    onSuccess: (data) => {
      if (!data) return;

      const { uid } = data.user;
      uid && addUser({ data: { id: uid, role: RoleEnum.USER } });

      if (typeof props === "undefined") return;
      props.onSuccess?.();
    },
  });

  return { confirmOtp, ...rest };
};
