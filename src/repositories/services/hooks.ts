import { config } from "@/config";
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useEffect } from "react";

const useErrorEffect = (error: unknown) => {
  useEffect(() => {
    if (!error) return;

    // do something else here

    if (typeof error === "string") {
      console.log(error);
      // Alert.alert('Warning', error);
      return;
    }

    // for firebase exception
    const e = error as { message: string; code: string };
    console.log(e.message);
    // Alert.alert('Warning', e.message);
  }, [error]);
};

type ApiQueryProps<Output> = UseQueryOptions<Output, unknown, Output, QueryKey>;
export const useApiQuery = <Output>(props: ApiQueryProps<Output>) => {
  const { error, ...rest } = useQuery<Output, unknown>({
    ...props,
    staleTime: config.staleTime,
  });

  useErrorEffect(error);

  return {
    error,
    ...rest,
  };
};

type ApiMutationProps<Output, Input> = UseMutationOptions<
  Output,
  unknown,
  Input
>;
export const useApiMutation = <Output, Input = void>(
  props: ApiMutationProps<Output, Input>
) => {
  const { error, ...rest } = useMutation<Output, unknown, Input>(props);

  useErrorEffect(error);

  return {
    error,
    ...rest,
  };
};
