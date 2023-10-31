import useAxiosAuth from "@/hook/useAxiosAuth";
import useNotification from "@/hook/useNotification";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArtikelPaginationResponse,
  ArtikelResponse,
  TambahArtikelPayload,
  UpdateArtikelPayload,
} from "../interface/artikel.interface";
import { AxiosResponse } from "axios";

const useArtikelModule = () => {
  const { toastError, toastSuccess, toastWarning } = useNotification();
  const axiosClient = useAxiosAuth();

  const useGetArtikel = () => {
    const getArtikel = async (): Promise<ArtikelPaginationResponse> => {
      return axiosClient.get("/artikel").then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["/artikel"],
      queryFn: () => getArtikel(),
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useGetDetailArtikel = (id: any) => {
    const getDetailArtikel = (id: any): Promise<ArtikelResponse> => {
      return axiosClient.get(`/artikel/${id}`).then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["/artikel/:id"],
      queryFn: () => getDetailArtikel(id),
      enabled: !!id,
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useTambahArtikel = () => {
    const { mutate, isLoading } = useMutation(
      async (payload: TambahArtikelPayload): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.post("/artikel/create", payload, {
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
        },
        onError: (error) => {
          console.error("error", error);
          toastError();
        },
      },
    );

    return { mutate, isLoading };
  };

  const useUpdateArtikel = () => {
    const { mutate, isLoading } = useMutation(
      async ({
        id,
        payload,
      }: {
        id: any;
        payload: UpdateArtikelPayload;
      }): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.put(
            `/artikel/update/${id}`,
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

  const useDeleteArtikel = () => {
    const { mutate, isLoading } = useMutation(
      async (id: any): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.delete(`/artikel/delete/${id}`);
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
    useGetArtikel,
    useGetDetailArtikel,
    useTambahArtikel,
    useDeleteArtikel,
    useUpdateArtikel,
  };
};

export default useArtikelModule;
