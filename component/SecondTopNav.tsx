"use client";
import React from "react";
import RouteButton from "./RouteButton";
import { FaSquarePlus } from "react-icons/fa6";
import { useProfileService } from "@/app/auth/service/auth.service";

interface SecondHeaderProps {
  totalData: number | string;
  title: string;
  navigateTo: string;
  isLoading?: any;
}

const SecondTopNav: React.FC<SecondHeaderProps> = ({
  navigateTo,
  title,
  totalData,
  isLoading,
}) => {
  const { data } = useProfileService();
  let role = data?.data.role_id.role_name;

  return (
    <section className="mb-[50px] flex w-full items-center justify-between rounded-[10px] bg-primary p-5">
      <div className="flex flex-col items-start">
        <p className="mb-2 text-[20px] font-semibold text-white">
          {title}{" "}
          <span className="rounded-[22px] bg-[#ffffff65] px-2 py-1 text-[13px] font-normal text-white">
            {isLoading ? "Loading..." : totalData} {title}
          </span>
        </p>
        <p className="text-white">Kumpulan berbagai {title}.</p>
      </div>
      <div>
        <RouteButton
          to={navigateTo}
          title={`Tambah ${title}`}
          width={"100%"}
          bg={"blue.500"}
          color={"white"}
          justifyContent="flex-start"
          _hover={{ bg: "blue.600" }}
          leftIcon={<FaSquarePlus color="#ffffff" />}
        />
      </div>
    </section>
  );
};

export default SecondTopNav;
