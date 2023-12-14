"use client";
import { CustomHeader } from "@/components";
import { NextPage } from "next";
import Image from "next/image";
import { useProfileService } from "@/app/auth/service/auth.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SummaryData } from "./sections";
import Kalender from "./sections/kalender.section";
import JadwalSholat from "./sections/jadwalSholat.section";

interface Props {}

const Dashboard: NextPage<Props> = ({}) => {
  const { data, isFetching, isLoading: isLoadingProfile } = useProfileService();

  return (
    <div className="h-full w-full">
      <CustomHeader />

      <section className="relative mb-[50px] h-60 w-full overflow-hidden shadow-md lg:mb-[20px] lg:rounded-[10px]">
        <Image
          src={"/assets/images/kaabah.jpeg"}
          alt="Background Image"
          style={{
            objectFit: "cover",
            objectPosition: "center 80%",
            overflow: "hidden",
          }}
          quality={100}
          loading="eager"
          width="0"
          height="0"
          sizes="100vw"
          className="h-full w-full bg-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        {/* <div className="absolute inset-0 block bg-gradient-to-t from-white lg:hidden lg:to-transparent"></div> */}

        <div className="absolute inset-0 flex h-full w-full flex-col justify-between p-5 text-white">
          <div className="flex flex-col items-start">
            <p className="text-[13px] text-white lg:text-[16px]">
              Selamat Datang 👋,
            </p>
            {isLoadingProfile || isFetching ? (
              <div
                className={`${
                  isLoadingProfile || isFetching ? "w-[20%]" : "w-full"
                } rounded-[15px]`}
              >
                <Skeleton
                  height={30}
                  baseColor="#9FA1B5"
                  highlightColor="#ffffff"
                />
              </div>
            ) : (
              <p className="text-[30px] font-bold text-white">
                {data?.data.username}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[15px] text-white lg:text-[16px]">
              Senang bertemu denganmu kembali!
            </p>
            <p className="text-[15px] text-white lg:text-[16px]">
              semoga harimu indah 😊.
            </p>
          </div>
        </div>
      </section>

      <SummaryData />

      <section className="mb-[50px] grid grid-cols-1 gap-y-[50px] px-5 lg:mb-[20px] lg:grid-cols-3 lg:gap-x-5 lg:gap-y-0 lg:px-0">
        <JadwalSholat />
        <Kalender />
      </section>
    </div>
  );
};

export default Dashboard;

{
  /* <AreaChart options={options} series={series} /> */
}
// const options = {
//   chart: {
//     foreColor: "#ffffff",
//     height: 80,
//   },
//   dataLabels: {
//     enabled: false,
//   },
//   xaxis: {
//     categories: [
//       "jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "Mei",
//       "Jun",
//       "Jul",
//       "Agu",
//       "Sep",
//       "Okt",
//       "Nov",
//       "Des",
//     ],
//   },
// };

// const series = [
//   {
//     name: "Pengunjung Mobile",
//     data: [31, 40, 28, 51, 42, 109, 102, 25, 10, 30, 55, 75],
//   },
//   {
//     name: "Pengunjung Website",
//     data: [11, 32, 45, 32, 34, 52, 41, 20, 39, 33, 45, 100],
//   },
// ];
