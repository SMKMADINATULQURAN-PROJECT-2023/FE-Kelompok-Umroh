import useAxiosAuth from "@/hook/useAxiosAuth";
import useNotification from "@/hook/useNotification";
import {
  PanduanPaginationResponse,
  PanduanResponse,
  TambahPanduanPayload,
  UpdatePanduanPayload,
} from "../interface/panduan.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const usePanduanModule = () => {
  const { toastError, toastSuccess, toastWarning } = useNotification();
  const axiosClient = useAxiosAuth();
  const queryClient = useQueryClient();

  const useGetPanduan = (
    page: number = 1,
    pageSize: number = 10,
    status: string = "",
    created_by: string = "",
    kategori_panduan: string = "",
    gender: string = "",
    keyword: string = "",
  ) => {
    const getPanduan = async (): Promise<PanduanPaginationResponse> => {
      return axiosClient
        .get(
          `/panduan?kategori_panduan=${kategori_panduan}&page=${page}&pageSize=${pageSize}&status=${status}&created_by=${created_by}&gender=${gender}&keyword=${keyword}`,
        )
        .then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: [
        "/panduan",
        kategori_panduan,
        status,
        created_by,
        page,
        pageSize,
      ],
      queryFn: () => getPanduan(),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useGetDetailPanduan = (id: any) => {
    const getDetailPanduan = (id: any): Promise<PanduanResponse> => {
      return axiosClient.get(`/panduan/${id}`).then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: [`/panduan/:${id}`, id],
      queryFn: () => getDetailPanduan(id),
      enabled: !!id,
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useTambahPanduan = () => {
    const { mutate, isLoading } = useMutation(
      async (payload: TambahPanduanPayload): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.post("/panduan/create", payload, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/panduan"]);
        },
        onError: (error) => {
          console.error("error", error);
          toastError();
        },
      },
    );

    return { mutate, isLoading };
  };

  const useUpdatePanduan = () => {
    const { mutate, isLoading } = useMutation(
      async ({
        id,
        payload,
      }: {
        id: any;
        payload: UpdatePanduanPayload;
      }): Promise<AxiosResponse> => {
        console.log("payload", payload);
        console.log("id", id);
        try {
          const response = await axiosClient.put(
            `/panduan/update/${id}`,
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
          queryClient.invalidateQueries(["/panduan"]);
        },
        onError: (error) => {
          console.error("error", error);
          console.log("error pakk", error);
          toastError();
        },
      },
    );

    return { mutate, isLoading };
  };

  const useDeletePanduan = () => {
    const { mutate, isLoading } = useMutation(
      async (id: any): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.delete(`/panduan/delete/${id}`);
          return response;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          queryClient.invalidateQueries(["/panduan"]);
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
    useGetPanduan,
    useGetDetailPanduan,
    useTambahPanduan,
    useUpdatePanduan,
    useDeletePanduan,
  };
};

export default usePanduanModule;
