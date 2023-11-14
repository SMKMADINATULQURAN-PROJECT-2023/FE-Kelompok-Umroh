import useNotification from "@/hook/useNotification";
import {
  TambahZiarahPayload,
  UpdateZiarahPayload,
  ZiarahPaginationResponse,
  ZiarahResponse,
} from "../interface/ziarah.interface";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const useZiarahModule = () => {
  const { toastError, toastSuccess, toastWarning } = useNotification();
  const axiosClient = useAxiosAuth();

  const useGetZiarah = (page = 1, pageSize = 10) => {
    const getZiarah = async (): Promise<ZiarahPaginationResponse> => {
      return axiosClient
        .get(`/lokasi_ziarah?page=${page}&pageSize=${pageSize}`)
        .then((res) => res.data);
    };
    const { data, isError, isFetching, isLoading, refetch } = useQuery({
      queryKey: ["lokasi_ziarah"],
      queryFn: () => getZiarah(),
    });

    return { data, isError, isFetching, isLoading, refetch };
  };

  const useGetDetailZiarah = (id: any) => {
    const getDetail = async (): Promise<ZiarahResponse> => {
      return axiosClient.get(`/lokasi_ziarah/${id}`).then((res) => res.data);
    };

    const { data, isError, isFetching, isLoading, refetch } = useQuery({
      queryKey: [`lokasi_ziarah/${id}`, id],
      queryFn: () => getDetail(),
      enabled: !!id,
    });

    return { data, isError, isFetching, isLoading, refetch };
  };

  const useTambahZiarah = () => {
    const { mutate, isLoading } = useMutation(
      async (payload: TambahZiarahPayload): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.post(
            "/lokasi_ziarah/create",
            payload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );

          return response;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
        },
        onError: (error) => {
          console.error("error", error);
          toastError();
        },
      },
    );
    return { mutate, isLoading };
  };
  const useUpdateZiarah = () => {
    const { mutate, isLoading } = useMutation(
      async ({
        id,
        payload,
      }: {
        id: any;
        payload: UpdateZiarahPayload;
      }): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.put(
            `/lokasi_ziarah/update/${id}`,
            payload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );
          return response;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
        },
        onError: (error) => {
          console.error("error", error);
          toastError();
        },
      },
    );

    return { mutate, isLoading };
  };

  const useDeleteZiarah = () => {
    const { mutate, isLoading } = useMutation(
      async (id: any): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.delete(
            `/lokasi_ziarah/delete/${id}`,
          );
          console.log("res", response);
          return response;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
        },
        onError: (error) => {
          console.error("error", error);
          toastError();
        },
      },
    );

    return { mutate, isLoading };
  };
  return {
    useGetZiarah,
    useTambahZiarah,
    useDeleteZiarah,
    useUpdateZiarah,
    useGetDetailZiarah,
  };
};

export default useZiarahModule;
