import useAxiosAuth from "@/hook/useAxiosAuth";
import useNotification from "@/hook/useNotification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const useGetArtikel = (
    page: number = 1,
    pageSize: number = 10,
    status: string = "",
    created_by: string = "",
    keyword: string = "",
  ) => {
    const getArtikel = async (): Promise<ArtikelPaginationResponse> => {
      return axiosClient
        .get(
          `/artikel?page=${page}&pageSize=${pageSize}&status=${status}&created_by=${created_by}&keyword=${keyword}`,
        )
        .then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["/artikel", page, pageSize, status, created_by, keyword],
      queryFn: () => getArtikel(),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useGetDetailArtikel = (id: number) => {
    const getDetailArtikel = (): Promise<ArtikelResponse> => {
      return axiosClient.get(`/artikel/${id}`).then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: [`/artikel/${id}`, id],
      queryFn: () => getDetailArtikel(),
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
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
          queryClient.invalidateQueries(["/artikel"]);
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
          queryClient.invalidateQueries(["/artikel"]);
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
          queryClient.invalidateQueries(["/artikel"]);
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
