import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { KeyService, auth, useApiMutation } from "../services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";

type LoginProps = { onSuccess?: () => void } | void;
type LoginInput = { email: string; password: string };
type LoginOutput = UserCredential;
export const useLoginRepo = (props: LoginProps) => {
  const { mutate: login, ...rest } = useApiMutation<LoginOutput, LoginInput>({
    mutationKey: [KeyService.LOGIN],
    mutationFn: async ({ email, password }) => {
      await utils.sleep(devToolConfig.delayFetching);

      const user = await signInWithEmailAndPassword(auth, email, password);
      return user;
    },
    ...props,
  });

  return { login, ...rest };
};
