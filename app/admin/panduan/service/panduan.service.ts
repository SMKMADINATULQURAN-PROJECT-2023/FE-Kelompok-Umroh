import useAxiosAuth from "@/hook/useAxiosAuth";
import useNotification from "@/hook/useNotification";
import {
  PanduanPaginationResponse,
  PanduanResponse,
  TambahPanduanPayload,
  UpdatePanduanPayload,
} from "../interface/panduan.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const usePanduanModule = () => {
  const { toastError, toastSuccess, toastWarning } = useNotification();
  const axiosClient = useAxiosAuth();

  const useGetPanduan = (kategori: string = '') => {
    const getPanduan = async (kategori: string): Promise<PanduanPaginationResponse> => {
      return axiosClient.get(`/panduan?kategori=${kategori}`).then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["/panduan"],
      queryFn: () => getPanduan(kategori),
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useGetDetailPanduan = (id: any) => {
    const getDetailPanduan = (id: any): Promise<PanduanResponse> => {
      return axiosClient.get(`/panduan/${id}`).then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["/panduan/:id"],
      queryFn: () => getDetailPanduan(id),
      enabled: !!id,
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useTambahPanduan = () => {
    const { mutate, isLoading } = useMutation(
      async (payload: TambahPanduanPayload): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.post("/panduan/create", payload);
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

  const useUpdatePanduan = () => {
    const { mutate, isLoading } = useMutation(
      async ({
        id,
        payload,
      }: {
        id: any;
        payload: UpdatePanduanPayload;
      }): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.put(
            `/panduan/update/${id}`,
            payload,
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
