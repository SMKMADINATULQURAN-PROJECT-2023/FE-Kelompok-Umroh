import { FC, useEffect } from "react";
import { FaClock, FaLocationCrosshairs } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import dayjs from "dayjs";
import "react-loading-skeleton/dist/skeleton.css";
import useJadwalSholatModule from "../service/jadwalSholat.service";
import useGeolocation from "../service/geolocation.service";

interface JadwalSholatProps {}

const JadwalSholat: FC<JadwalSholatProps> = ({}) => {
  const currentYear = dayjs().year();
  const currentMonth = dayjs().month() + 1; // Months are zero-based, so add 1
  const currentDate = dayjs().date();

  const { useGetIdKota, useGetJadwalSholat } = useJadwalSholatModule();
  const {
    data: geolocationData,
    isFetching,
    isError,
    refetch: refetchGeolocation,
  } = useGeolocation();

  const { data: datakota, refetch: refetchIdKota } = useGetIdKota(
    geolocationData?.address.county,
  );
  const idKota = datakota?.data?.[0]?.id || 0;
  const {
    data: jadwalSholatData,
    isFetching: isFetchingJadwalSholat,
    isLoading: isLoadingJadwalSholat,
    isError: isErrorJadwalSholat,
    refetch: refetchJadwalSholat,
  } = useGetJadwalSholat(idKota, currentYear, currentMonth, currentDate);

  console.log("jadwal", jadwalSholatData?.data?.jadwal);
  console.log(idKota);

  const placeName = geolocationData?.display_name || "-";

  const JADWAL_SHOLAT = [
    { nama: "imsak", waktu: jadwalSholatData?.data?.jadwal.imsak },
    { nama: "subuh", waktu: jadwalSholatData?.data?.jadwal.subuh },
    { nama: "terbit", waktu: jadwalSholatData?.data?.jadwal.terbit },
    { nama: "dhuha", waktu: jadwalSholatData?.data?.jadwal.dhuha },
    { nama: "dzuhur", waktu: jadwalSholatData?.data?.jadwal.dzuhur },
    { nama: "ashar", waktu: jadwalSholatData?.data?.jadwal.ashar },
    { nama: "maghrib", waktu: jadwalSholatData?.data?.jadwal.maghrib },
    { nama: "isya", waktu: jadwalSholatData?.data?.jadwal.isya },
  ];

  useEffect(() => {
    if (geolocationData?.address.county) {
      refetchIdKota();
      refetchJadwalSholat();
    }
  }, [geolocationData?.address.county, datakota?.data?.[0]?.id, refetchIdKota]);
  return (
    <div className="col-span-2 flex w-full flex-col overflow-hidden rounded-[10px] bg-white p-5 shadow-md">
      <div className="mb-7 flex items-center justify-between gap-x-7 lg:mb-[10px]">
        <div className="flex items-center gap-x-3">
          <div className="rounded-[5px] bg-primary bg-opacity-20 p-3">
            <FaClock className="text-lg text-primary" />
          </div>
          <p className="text-lg font-bold capitalize text-primary">
            jadwal sholat
          </p>
        </div>
        <div className="flex items-center gap-x-3 rounded-[5px] bg-primary bg-opacity-20 px-4 py-2">
          <FaLocationCrosshairs className="text-lg text-primary" />
          {isFetching ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error fetching geolocation</p>
          ) : (
            <p className="line-clamp-2 w-full text-sm lg:line-clamp-none">
              {placeName}
            </p>
          )}
        </div>
      </div>

      <div className="grid h-full w-full grid-cols-2 items-center gap-x-3 gap-y-7 lg:grid-cols-4 lg:gap-y-0">
        {JADWAL_SHOLAT.map((jadwal, i) => {
          return (
            <div
              key={jadwal.nama}
              className="flex w-full flex-col items-center gap-y-2 lg:gap-y-4"
            >
              <h1 className="font-medium capitalize text-abu">{jadwal.nama}</h1>
              <div className="w-full flex justify-center">
                {isFetchingJadwalSholat || isLoadingJadwalSholat ? (
                  <div className={`w-1/2 flex-none`}>
                    <Skeleton
                      height={40}
                      baseColor="#9FA1B5"
                      highlightColor="#ffffff"
                    />
                  </div>
                ) : isErrorJadwalSholat ? (
                  <p className="text-center font-mono text-base font-bold">
                    Terjadi Kesalahan
                  </p>
                ) : (
                  (
                    <p className="text-center font-mono text-xl font-bold capitalize">
                      {jadwal?.waktu}
                    </p>
                  ) || (
                    <div className={`w-full flex-none`}>
                      <Skeleton
                        height={50}
                        baseColor="#9FA1B5"
                        highlightColor="#ffffff"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JadwalSholat;
