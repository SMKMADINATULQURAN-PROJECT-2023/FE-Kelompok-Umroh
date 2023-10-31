import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AdminListPaginationResponse,
  TambahUserPayload,
  UserListPaginationResponse,
  UserResponse,
} from "../interface/user.interface";
import useNotification from "@/hook/useNotification";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { AxiosResponse } from "axios";

const useUserModule = () => {
  const { toastError, toastSuccess, toastWarning } = useNotification();
  const axiosClient = useAxiosAuth();

  const useGetUserAdmin = () => {
    const getUserAdmin = async (): Promise<AdminListPaginationResponse> => {
      return axiosClient.get("/admin").then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["/admin"],
      queryFn: () => getUserAdmin(),
    });

    return { data, isFetching, isLoading, isError, refetch };
  };
  const useGetUserMobile = () => {
    const getUser = async (): Promise<UserListPaginationResponse> => {
      return axiosClient.get("/user").then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["/user"],
      queryFn: () => getUser(),
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useGetDetailUserMobile = (id: any) => {
    const getDetail = (id: any): Promise<UserResponse> => {
      return axiosClient.get(`/user/${id}`).then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["/user/:id"],
      queryFn: () => getDetail(id),
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useTambahUser = () => {
    const { mutate, isLoading } = useMutation(
      (payload: TambahUserPayload): Promise<AxiosResponse> => {
        return axiosClient.post("/admin/create", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
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

  return {
    useTambahUser,
    useGetUserAdmin,
    useGetDetailUserMobile,
    useGetUserMobile,
  };
};

export default useUserModule;
