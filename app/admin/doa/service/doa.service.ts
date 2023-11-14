import useAxiosAuth from "@/hook/useAxiosAuth";
import useNotification from "@/hook/useNotification";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DoaListPaginationResponse,
  DoaResponse,
  KategoriDoaPaginationResponse,
  KategoriDoaResponse,
  TambahDoaPayload,
  TambahKategoriDoaPayload,
  UpdateDoaPayload,
  UpdateKategoriDoaPayload,
} from "../interface/doa.interface";
import { AxiosResponse } from "axios";

const useDoaModule = () => {
  const { toastError, toastSuccess, toastWarning, toastInfo } =
    useNotification();
  const axiosClient = useAxiosAuth();

  const useGetDoa = () => {
    const getDoa = async (): Promise<DoaListPaginationResponse> => {
      return axiosClient.get("/doa").then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["/doa"],
      queryFn: () => getDoa(),
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useGetDetailDoa = (id: any) => {
    const getDetail = (id: any): Promise<DoaResponse> => {
      return axiosClient.get(`/doa/${id}`).then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: [`/doa/${id}}`, id],
      queryFn: () => getDetail(id),
      enabled: !!id,
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useGetDetailKategoriDoa = (id: any) => {
    const getDetail = (id: any): Promise<KategoriDoaResponse> => {
      return axiosClient.get(`/doa/kategori/${id}`).then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: [`/doa/kategori/${id}}`, id],
      queryFn: () => getDetail(id),
      enabled: !!id,
    });

    return { data, isFetching, isLoading, isError, refetch };
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

  const useTambahKategoriDoa = () => {
    const { mutate, isLoading } = useMutation(
      async (payload: TambahKategoriDoaPayload): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.post(
            "/doa/kategori/create",
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

  const useUpdateDoa = () => {
    const { mutate, isLoading } = useMutation(
      async ({
        id,
        payload,
      }: {
        id: any;
        payload: UpdateDoaPayload;
      }): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.put(`/doa/update/${id}`, payload);
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
  const useUpdateKategoriDoa = () => {
    const { mutate, isLoading } = useMutation(
      async ({
        id,
        payload,
      }: {
        id: any;
        payload: UpdateKategoriDoaPayload;
      }): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.put(
            `/doa/kategori/update/${id}`,
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

  const useDeleteDoa = () => {
    const { mutate, isLoading } = useMutation(
      async (id: any): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.delete(`/doa/delete/${id}`);
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

  const useDeleteKategoriDoa = () => {
    const { mutate, isLoading } = useMutation(
      async (id: any): Promise<AxiosResponse> => {
        try {
          const response = await axiosClient.delete(
            `/doa/kategori/delete/${id}`,
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
    useGetDoa,
    useTambahDoa,
    useGetKategoriDoa,
    useTambahKategoriDoa,
    useUpdateDoa,
    useUpdateKategoriDoa,
    useDeleteKategoriDoa,
    useGetDetailDoa,
    useDeleteDoa,
    useGetDetailKategoriDoa,
  };
};

export default useDoaModule;
