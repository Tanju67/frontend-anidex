import { z } from "zod";

type UseSafeQueryProps<T> = {
  data: unknown;
  isLoading: boolean;
  isFetching?: boolean;
  schema: z.ZodType<T>;
};

export function useSafeQuery<T>({
  data,
  isLoading,
  isFetching,
  schema,
}: UseSafeQueryProps<T>) {
  if (isLoading) {
    return {
      data: null,
      isLoading: true,
      isFetching: false,
      isError: false,
    };
  }

  if (!data) {
    return {
      data: null,
      isLoading: false,
      isFetching: false,
      isError: true,
    };
  }

  const result = schema.safeParse(data);

  if (!result.success) {
    console.error("Zod error:", result.error);
    return {
      data: null,
      isLoading: false,
      isFetching: false,
      isError: true,
    };
  }

  return {
    data: result.data,
    isLoading: false,
    isFetching: !!isFetching,
    isError: false,
  };
}
