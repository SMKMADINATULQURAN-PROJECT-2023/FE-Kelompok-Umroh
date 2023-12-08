import useAxiosAuth from "@/hook/useAxiosAuth";
import useNotification from "@/hook/useNotification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const useGetDoa = (
    page: number = 1,
    pageSize: number = 10,
    status: string = "",
    created_by: string = "",
    keyword: string = "",
  ) => {
    const getDoa = async (): Promise<DoaListPaginationResponse> => {
      return axiosClient
        .get(
          `/doa?page=${page}&pageSize=${pageSize}&status=${status}&created_by=${created_by}&keyword=${keyword}`,
        )
        .then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["/doa", page, pageSize, status, created_by, keyword],
      queryFn: () => getDoa(),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
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
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
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
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
    });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useGetKategoriDoa = (
    page: number = 1,
    pageSize: number = 10,
    status: string = "",
    created_by: string = "",
    keyword: string = "",
  ) => {
    const getKategori = async (): Promise<KategoriDoaPaginationResponse> => {
      return axiosClient
        .get(
          `/doa/kategori?page=${page}&pageSize=${pageSize}&status=${status}&created_by=${created_by}&keyword=${keyword}`,
        )
        .then((res) => res.data);
    };

    const { data, isFetching, isLoading, isError, refetch } = useQuery({
      queryKey: ["/doa/kategori", page, pageSize, status, created_by, keyword],
      queryFn: () => getKategori(),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
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
          queryClient.invalidateQueries(["/doa"]);
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
          queryClient.invalidateQueries(["/doa/kategori"]);
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
          queryClient.invalidateQueries(["/doa"]);
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
          queryClient.invalidateQueries(["/doa/kategori"]);
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
          queryClient.invalidateQueries(["/doa"]);
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
          queryClient.invalidateQueries(["/doa/kategori"]);
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
