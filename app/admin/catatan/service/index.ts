import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/hook/useAxiosAuth";
import { GetlistResponse } from "../interface";

const useCatatan = () => {
  const { data: session } = useSession();
  const axiosClient = useAxiosAuth();
  const getCatatanList = async (): Promise<GetlistResponse> => {
    return axiosClient.get("/catatan/list").then((res) => res.data);
  };

  const useCatatanList = () => {
    console.log('ses', session)
    const { data, isFetching, isLoading } = useQuery({
      queryKey: ["/catatan/list"],
      queryFn: () => getCatatanList(),
      enabled: session?.user?.id !== undefined,
    });

    return { data, isFetching, isLoading };
  };

  return { useCatatanList };
};

export default useCatatan;
