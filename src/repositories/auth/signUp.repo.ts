import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { useAddUserRepo } from "../users";
import { KeyService, auth, useApiMutation } from "../services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";
import { RoleEnum } from "@/models";

type LoginProps = { onSuccess?: () => void } | void;
type LoginInput = { email: string; password: string };
type LoginOutput = UserCredential;
export const useSignUpRepo = (props: LoginProps) => {
  const { addUser } = useAddUserRepo();

  const { mutate: signUp, ...rest } = useApiMutation<LoginOutput, LoginInput>({
    mutationKey: [KeyService.SIGN_UP],
    mutationFn: async ({ email, password }) => {
      await utils.sleep(devToolConfig.delayFetching);

      const user = await createUserWithEmailAndPassword(auth, email, password);

      return user;
    },
    onSuccess: (data) => {
      addUser({ data: { id: data.user.uid, role: RoleEnum.USER } });

      if (typeof props === "undefined") return;
      props.onSuccess?.();
    },
  });

  return { signUp, ...rest };
};
