import { useMutation, useQuery } from "@tanstack/react-query";
import { AdminListPaginationResponse, AdminListResponse, TambahUserPayload } from "../interface/user.interface";
import useNotification from "@/hook/useNotification";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { AxiosResponse } from "axios";

const useUserModule = () => {
  const { toastError, toastSuccess, toastWarning } = useNotification();
  const axiosClient = useAxiosAuth();

  const useGetUserAdmin = () => {
    const getUser = async (): Promise<AdminListPaginationResponse> => {
      return axiosClient.get("/admin").then((res) => res.data);
    };

    const { data, isFetching, isLoading } = useQuery({
      queryKey: ["/admin"],
      queryFn: () => getUser(),
    });

    return { data, isFetching, isLoading };
  };

  const useTambahUser = () => {
    const { mutate, isLoading } = useMutation(
      (payload: TambahUserPayload): Promise<AxiosResponse> => {
        return axiosClient.post("/admin/create", payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
        },
        onError: (error) => {
          alert("erroor");
          toastError();
        },
      },
    );
    return { mutate, isLoading };
  };

  return { useTambahUser, useGetUserAdmin };
};

export default useUserModule;
