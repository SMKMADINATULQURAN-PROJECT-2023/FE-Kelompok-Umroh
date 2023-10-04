import useAxiosAuth from "@/hook/useAxiosAuth";
import useNotification from "@/hook/useNotification";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DoaListPaginationResponse,
  KategoriDoaPaginationResponse,
  TambahDoaPayload,
  TambahKategoriDoaPayload,
} from "../interface/doa.interface";
import { AxiosResponse } from "axios";

const useDoaModule = () => {
  const { toastError, toastSuccess, toastWarning } = useNotification();
  const axiosClient = useAxiosAuth();

  const useGetDoa = () => {
    const getDoa = async (): Promise<DoaListPaginationResponse> => {
      return axiosClient.get("/doa").then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError } = useQuery({
      queryKey: ["/doa"],
      queryFn: () => getDoa(),
    });

    return { data, isFetching, isLoading, isError };
  };

  const useGetKategoriDoa = () => {
    const getKategori = async (): Promise<KategoriDoaPaginationResponse> => {
      return axiosClient.get("/doa/kategori").then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["/doa/kategori"],
      queryFn: () => getKategori(),
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useTambahDoa = () => {
    const { mutate, isLoading } = useMutation(
      async (payload: TambahDoaPayload): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.post("/doa/create", payload);

          return response;
        } catch (error) {
          console.error(error);
          throw error; // Rethrow the error to be caught by onError
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

  const useTambahKategoriDoa = () => {
    const { mutate, isLoading } = useMutation(
      async (payload: TambahKategoriDoaPayload): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.post("/doa/kategori/create", payload);

          return response;
        } catch (error) {
          console.error(error);
          throw error; // Rethrow the error to be caught by onError
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

  return { useGetDoa, useTambahDoa, useGetKategoriDoa, useTambahKategoriDoa };
};

export default useDoaModule;
