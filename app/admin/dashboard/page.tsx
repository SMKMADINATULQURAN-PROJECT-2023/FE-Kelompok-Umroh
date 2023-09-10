import { CustomHeader } from "@/component";
import { NextPage } from "next";
import { useState } from "react";
import kabah from "../../../assets/images/kaabah.jpeg";
import Image from "next/image";
import {
  FaHouseChimney,
  FaSliders,
  FaFilePen,
  FaHandsHolding,
  FaCalendar,
  FaEye,
} from "react-icons/fa6";

import ReactApexChart from "react-apexcharts";
import { AreaChart, Calendar } from "./component";

interface Props {}

const Dashboard: NextPage<Props> = ({}) => {
  const options = {
    chart: {
      foreColor: "#ffffff",
      height: 80,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const series = [
    {
      name: "Pengunjung Mobile",
      data: [31, 40, 28, 51, 42, 109, 102, 25, 10, 30, 55, 75],
    },
    {
      name: "Pengunjung Website",
      data: [11, 32, 45, 32, 34, 52, 41, 20, 39, 33, 45, 100],
    },
  ];

  const totalItem = [
    {
      item: "Total User",
      total: "122",
      icon: <FaHouseChimney color="#262a56" size={20} />,
    },
    {
      item: "Total Slider",
      total: "3",
      icon: <FaSliders color="#262a56" size={20} />,
    },
    {
      item: "Total Doa",
      total: "50",
      icon: <FaHandsHolding color="#262a56" size={20} />,
    },
    {
      item: "Total Artikel",
      total: "25",
      icon: <FaFilePen color="#262a56" size={20} />,
    },
  ];
  return (
    <div className="w-full h-full bg-white">
      <CustomHeader />

      <section className="w-full bg-primary rounded-[10px] relative h-60 overflow-hidden mb-[20px]">
        <Image
          src={kabah}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-transparent"></div>
        <div className="absolute p-5 h-full w-full inset-0 flex flex-col justify-between text-white">
          <div className="flex flex-col items-start">
            <p className="text-abu font-semibold">Selamat Datang,</p>
            <p className="text-white font-bold text-[30px]">Username</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-abu">Senang bertemu denganmu kembali!</p>
            <p className="text-abu">semoga harimu indah 😊.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-x-5 mb-[20px]">
        {totalItem.map((_, i) => {
          return (
            <div
              key={i}
              className="flex items-center p-5 justify-between bg-primary rounded-[10px] w-full"
            >
              <div className="flex flex-col items-start">
                <p className="text-abu font-semibold">{_.item}</p>
                <p className="text-white text-[25px] font-bold">{_.total}</p>
              </div>
              <div className="bg-white rounded-[10px] p-3">{_.icon}</div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-3 gap-x-5 mb-[20px]">
        <div className="bg-primary rounded-[10px] w-full col-span-2 p-5 flex flex-col overflow-hidden">
          <div className="flex items-center  mb-[10px] space-x-3">
            <div className="bg-white rounded-[10px] p-3">
              <FaEye color="#262a56" size={20} />
            </div>
            <p className="text-white text-[24px] font-bold">
              Statistik Pengunjung
            </p>
          </div>
          <AreaChart />
        </div>
        <div className="bg-primary rounded-[10px] w-full p-5 overflow-hidden">
          <div className="flex items-center  mb-[10px] space-x-3">
            <div className="bg-white rounded-[10px] p-3">
              <FaCalendar color="#262a56" size={20} />
            </div>
            <p className="text-white text-[24px] font-bold ">Kalender</p>
          </div>
          <Calendar />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
