"use client";
import { CustomHeader } from "@/components";
import { NextPage } from "next";
import Image from "next/image";
import { FaCalendar, FaEye } from "react-icons/fa6";
import { Calendar } from "./component";
import { useProfileService } from "@/app/auth/service/auth.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import totalDataDashboardModule from "./service/totalData.service";
import { Suspense } from "react";

interface Props {}
const Dashboard: NextPage<Props> = ({}) => {
  const { data, isFetching, isLoading: isLoadingProfile } = useProfileService();
  const { isLoading, totalItem } = totalDataDashboardModule();

  const firstRowItems = totalItem.slice(0, 4);
  const secondRowItems = totalItem.slice(4);

  return (
    <div className="h-full w-full bg-white">
      <CustomHeader />

      <section className="relative mb-[20px] h-60 w-full overflow-hidden rounded-[10px] bg-primary">
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
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-transparent"></div>
        <div className="absolute inset-0 flex h-full w-full flex-col justify-between p-5 text-white">
          <div className="flex flex-col items-start">
            <p className="text-abu">Selamat Datang 👋,</p>
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
            <p className="text-abu">Senang bertemu denganmu kembali!</p>
            <p className="text-abu">semoga harimu indah 😊.</p>
          </div>
        </div>
      </section>

      <section className="mb-[20px] space-y-5">
        <div className="grid grid-cols-4 gap-5">
          {firstRowItems.map((_, i) => (
            <div
              key={i}
              className="flex w-full items-center justify-between rounded-[10px] bg-primary p-5"
            >
              <div className="flex flex-col items-start">
                <p className="text-abu">{_.item}</p>
                {isLoading ? (
                  <div
                    className={`${
                      isLoading ? "w-14" : "w-full"
                    } rounded-[15px]`}
                  >
                    <Skeleton
                      height={25}
                      baseColor="#9FA1B5"
                      highlightColor="#ffffff"
                    />
                  </div>
                ) : (
                  <p className="text-[20px] font-bold text-white">{_.total}</p>
                )}
              </div>
              <div className="rounded-[5px] bg-white p-3">{_.icon}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-5">
          {secondRowItems.map((_, i) => (
            <div
              key={i}
              className="flex w-full items-center justify-between rounded-[10px] bg-primary p-5"
            >
              <div className="flex flex-col items-start">
                <p className="text-abu">{_.item}</p>
                {isLoading ? (
                  <div
                    className={`${
                      isLoading ? "w-14" : "w-full"
                    } rounded-[15px]`}
                  >
                    <Skeleton
                      height={25}
                      baseColor="#9FA1B5"
                      highlightColor="#ffffff"
                    />
                  </div>
                ) : (
                  <p className="text-[20px] font-bold text-white">{_.total}</p>
                )}
              </div>
              <div className="rounded-[5px] bg-white p-3">{_.icon}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-[20px] grid grid-cols-3 gap-x-5">
        <div className="col-span-2 flex w-full flex-col overflow-hidden rounded-[10px] bg-primary p-5">
          <div className="mb-[10px] flex  items-center space-x-3">
            <div className="rounded-[5px] bg-white p-3">
              <FaEye color="#262a56" size={18} />
            </div>
            <p className="text-[20px] font-bold text-white">-</p>
          </div>
          {/* <AreaChart options={options} series={series} /> */}
        </div>
        <div className="w-full overflow-hidden rounded-[10px] bg-primary p-5">
          <div className="mb-[10px] flex  items-center space-x-3">
            <div className="rounded-[5px] bg-white p-3">
              <FaCalendar color="#262a56" size={18} />
            </div>
            <p className="text-[20px] font-bold text-white ">Kalender</p>
          </div>
          <Calendar />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

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
