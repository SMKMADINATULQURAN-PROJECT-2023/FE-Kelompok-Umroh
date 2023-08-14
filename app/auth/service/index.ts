import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/service/axios";
import useNotification from "@/hook/useNotification";
import { signIn } from "next-auth/react";

export interface loginPayload {
  email: string;
  password: string;
}

export const useLoginService = () => {
  const { toastSuccess, toastError, toastWarning } = useNotification();
  const { mutate, isLoading } = useMutation(
    (payload: loginPayload) => {
      return axiosClient.post("/auth/login", payload);
    },
    {
      onSuccess: async (response) => {
        toastSuccess(response.data.message);
        await signIn("credentials", {
          id: response.data.data.id,
          name: response.data.data.name,
          email: response.data.data.email,
          accessToken: response.data.data.access_token,
          refreshToken: response.data.refresh_token,
          redirect: true,
        });
      },
      onError: (error: any) => {
        if (error.response.status === 422) {
          toastWarning(error.response.data.message);
        } else {
          toastError();
        }
      },
      onSettled: (respose) => {},
    }
  );

  return { mutate, isLoading };
};
