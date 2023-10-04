import useAxiosAuth from "@/hook/useAxiosAuth";
import useNotification from "@/hook/useNotification";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArtikelPaginationResponse,
  ArtikelResponse,
  TambahArtikelPayload,
} from "../interface/artikel.interface";
import { AxiosResponse } from "axios";

const useArtikelModule = () => {
  const { toastError, toastSuccess, toastWarning } = useNotification();
  const axiosClient = useAxiosAuth();

  const useGetArtikel = () => {
    const getArtikel = async (): Promise<ArtikelPaginationResponse> => {
      return axiosClient.get("/artikel").then((res) => res.data);
    };

    const { data, isFetching, isLoading } = useQuery({
      queryKey: ["/artikel"],
      queryFn: () => getArtikel(),
    });

    return { data, isFetching, isLoading };
  };

  const useGetDetailArtikel = (slug: string) => {
    const getDetailArtikel = (slug: string): Promise<ArtikelResponse> => {
      return axiosClient.get(`/artikel/${slug}`).then((res) => res.data);
    };

    const { data, isFetching, isLoading } = useQuery({
      queryKey: ["/artikel/:slug"],
      queryFn: () => getDetailArtikel(slug),
    });

    return { data, isFetching, isLoading };
  };

  const useTambahArtikel = () => {
    const { mutate, isLoading } = useMutation(
      async (payload: TambahArtikelPayload): Promise<AxiosResponse> => {
        // Define the return type as Promise<AxiosResponse>
        try {
          const response = await axiosClient.post("/artikel/create", payload, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response;
        } catch (error) {
          // Handle error here
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

  return { useGetArtikel, useGetDetailArtikel, useTambahArtikel };
};

export default useArtikelModule;
