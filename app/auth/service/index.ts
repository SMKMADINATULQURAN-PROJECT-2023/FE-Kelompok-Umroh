import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "@/hook/useNotification";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { signIn, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { GetProfileResponse } from "../interface";

export interface loginPayload {
  email: string;
  password: string;
}

export const useLoginService = () => {
  const { data: session, status } = useSession();
  const { toastSuccess, toastError, toastWarning } = useNotification();
  const axiosClient = useAxiosAuth();

  console.log("ngecek token", session?.user?.accessToken);
  const { mutate, isLoading } = useMutation(
    (payload: loginPayload) => {
      return axiosClient.post("/admin/login", payload);
    },
    {
      onSuccess: async (response) => {
        toastSuccess(response.data.message);
        console.log("ini dia", response);
        await signIn("credentials", {
          id: response.data.data.id,
          name: response.data.data.username,
          email: response.data.data.email,
          role: response.data.data.role_id.role_name,
          roleId: response.data.data.role_id.id,
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
          alert(error.response.data.message);
        }
      },
      onSettled: (respose) => {},
    },
  );

  return { mutate, isLoading };
};

export const useProfileService = () => {
  const axiosClient = useAxiosAuth();
  const { data: session, status } = useSession();

  const getProfile = async (): Promise<GetProfileResponse> => {
    return axiosClient.get(`/auth/profile-admin`).then((res) => res.data);
  };

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["/admin/profile"],
    queryFn: () => getProfile(),
  });

  return { data, isFetching, isLoading };
};
