import { utils } from "@/utils";
import { KeyService, auth, useApiMutation } from "../services";
import { devToolConfig } from "@/config";
import { signOut } from "firebase/auth";

type LogoutProps = { onSuccess?: () => void } | void;
type LogoutOutput = void;
export const useLogoutRepo = (props: LogoutProps) => {
  const { mutate: logout, ...rest } = useApiMutation<LogoutOutput>({
    mutationKey: [KeyService.LOGOUT],
    mutationFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      await signOut(auth);
    },
    ...props,
  });

  return { logout, ...rest };
};
