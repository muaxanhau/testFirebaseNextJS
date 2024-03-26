import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  useIsFetching,
  useIsMutating,
  useQueryClient,
} from "@tanstack/react-query";
import { z } from "zod";
import { resetAllStores, useAuthStore } from "@/stores";
import { auth } from "@/repositories";
import { usePathname, useRouter } from "next/navigation";

export const useFirstSetupApp = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const checkNavigation = () => {
    const isAuthorized = auth.currentUser !== null;
    router.push(isAuthorized ? "/app/categories" : "/login");
  };

  useLayoutEffect(() => {
    auth.onIdTokenChanged(async (user) => {
      if (!user) {
        resetAllStores();
        queryClient.clear();
        return;
      }

      const token = await user.getIdToken();
      setAuth({ token });
    });
  }, []);

  useEffect(checkNavigation, []);
};

export const useAppNetwork = (): "online" | "offline" => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline ? "online" : "offline";
};

type UseHookFormProps<T> = {
  schema: z.Schema<T>;
  defaultValues?: DefaultValues<T>;
};
export const useHookForm = <T extends FieldValues>({
  schema,
  defaultValues,
}: UseHookFormProps<T>) => {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return form;
};

export const useTimeout = (callback: () => void, delay: number) => {
  const refCallback = useRef<() => void>(callback);
  const refTimeout = useRef<NodeJS.Timeout>();

  const set = useCallback(() => {
    refTimeout.current = setTimeout(() => refCallback.current(), delay);
  }, [delay]);
  const clear = useCallback(() => {
    refTimeout.current && clearTimeout(refTimeout.current);
  }, []);
  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    refCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    set();

    return clear;
  }, []);

  return { reset, clear };
};

export const useDebounce = (
  callback: () => void,
  delay: number,
  deps?: React.DependencyList
) => {
  const { clear, reset } = useTimeout(callback, delay);

  useEffect(reset, [deps, reset]);
  useEffect(clear, []);
};

/**
 *
 * @param value initial value
 * @returns curr state, prev state, setState method
 */
export const usePreviousState = <T>(value: T): [T, T, (state: T) => void] => {
  const [currState, setCurrState] = useState<T>(value);
  const refPrevState = useRef<T>(value);

  const setState = (state: T) => {
    refPrevState.current = currState;
    setCurrState(state);
  };

  return [currState, refPrevState.current, setState];
};

/**
 * detect when fetch api/firebase
 * @returns isLoading
 */
export const useIsLoading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = !!isFetching || !!isMutating;

  return isLoading;
};

export const useCanGoBack = () => {
  const pathname = usePathname();

  const canGoBack = pathname !== "/" && pathname !== "/login";
  return canGoBack;
};
