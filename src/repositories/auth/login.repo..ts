import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { KeyService, auth, useApiMutation } from "../services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";
import { useAuthStore } from "@/stores";

type LoginProps = { onSuccess?: () => void } | void;
type LoginInput = { email: string; password: string };
type LoginOutput = UserCredential;
export const useLoginRepo = (props: LoginProps) => {
  const { setAuth } = useAuthStore();
  const { mutate: login, ...rest } = useApiMutation<LoginOutput, LoginInput>({
    mutationKey: [KeyService.LOGIN],
    mutationFn: async ({ email, password }) => {
      await utils.sleep(devToolConfig.delayFetching);

      const user = await signInWithEmailAndPassword(auth, email, password);
      return user;
    },
    onSuccess: async (data) => {
      const token = await data.user.getIdToken();
      setAuth({ token });

      if (typeof props === "undefined") return;
      props.onSuccess?.();
    },
  });

  return { login, ...rest };
};
