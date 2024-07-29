import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface JadwalsholatData {
  data: {
    jadwal: {
      tanggal: string;
      imsak: string;
      subuh: string;
      terbit: string;
      dhuha: string;
      dzuhur: string;
      ashar: string;
      maghrib: string;
      isya: string;
      date: string;
    };
  };
}
interface IdKotaData {
  data: { id: number; lokasi: string }[];
}

const useJadwalSholatModule = () => {
  const useGetIdKota = (kota: string = "") => {
    const getCityId = async (kota: string): Promise<IdKotaData> => {
      try {
        const apiUrl = `https://api.myquran.com/v2/sholat/kota/cari/${kota}`;
        const response = await axios.get(apiUrl);
        const data: IdKotaData = response.data;
        return data;
      } catch (error) {
        throw error;
      }
    };

    const { data, isFetching, isLoading, isError, refetch } =
      useQuery<IdKotaData>({
        queryKey: ["kota"],
        queryFn: () => getCityId(kota),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
      });

    return { data, isFetching, isLoading, isError, refetch };
  };

  const useGetJadwalSholat = (
    idKota: number = 0,
    tahun: number = 0,
    bulan: number = 0,
    tanggal: number = 0,
  ) => {
    const getJadwalSholat = async (
      idKota: number,
      tahun: number,
      bulan: number,
      tanggal: number,
    ): Promise<JadwalsholatData> => {
      try {
        const apiUrl = `https://api.myquran.com/v2/sholat/jadwal/${idKota}/${tahun}/${bulan}/${tanggal}`;
        const response = await axios.get(apiUrl);
        const data: JadwalsholatData = response.data;
        return data;
      } catch (error) {
        throw error;
      }
    };

    const { data, isFetching, isLoading, isError, refetch } =
      useQuery<JadwalsholatData>({
        queryKey: ["jadwal_sholat", [idKota]],
        queryFn: () => getJadwalSholat(idKota, tahun, bulan, tanggal),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
      });

    return { data, isFetching, isLoading, isError, refetch };
  };

  return { useGetIdKota, useGetJadwalSholat };
};

export default useJadwalSholatModule;
