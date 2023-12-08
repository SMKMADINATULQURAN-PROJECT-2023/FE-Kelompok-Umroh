import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const useGetUserAdmin = (
    page: number = 1,
    pageSize: number = 10,
    status: string = "",
    created_by: string = "",
    keyword: string = "",
  ) => {
    const getUserAdmin = async (): Promise<AdminListPaginationResponse> => {
      return axiosClient
        .get(
          `/admin?page=${page}&pageSize=${pageSize}&status=${status}&created_by=${created_by}&keyword=${keyword}`,
        )
        .then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["/admin", page, pageSize, status, created_by, keyword],
      queryFn: () => getUserAdmin(),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    });

    return { data, isFetching, isLoading, isError, refetch };
  };
  const useGetUserMobile = (
    page: number = 1,
    pageSize: number = 10,
    status: string = "",
    created_by: string = "",
    keyword: string = "",
  ) => {
    const getUser = async (): Promise<UserListPaginationResponse> => {
      return axiosClient
        .get(
          `/user?page=${page}&pageSize=${pageSize}&status=${status}&created_by=${created_by}&keyword=${keyword}`,
        )
        .then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["/user", page, pageSize, status, created_by, keyword],
      queryFn: () => getUser(),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useGetDetailUserMobile = (id: any) => {
    const getDetail = (id: any): Promise<UserResponse> => {
      return axiosClient.get(`/user/${id}`).then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: [`/user/${id}`, id],
      queryFn: () => getDetail(id),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
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
          queryClient.invalidateQueries(["/admin"]);
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
