import React from "react";
import RouteButton from "./RouteButton";
import { FaSquarePlus } from "react-icons/fa6";
import { useProfileService } from "@/app/auth/service/auth.service";
import { usePathname } from "next/navigation";

interface SecondHeaderProps {
  totalData: number | string;
  title: string;
  navigateTo: string;
  isLoading?: boolean;
  isSecondTitle?: boolean;
  secondTitle?: string;
  totalSecondData?: any;
}

const SecondTopNav: React.FC<SecondHeaderProps> = ({
  navigateTo,
  title,
  totalData,
  isLoading = false,
  isSecondTitle = false,
  secondTitle,
  totalSecondData,
}) => {
  const { data } = useProfileService();
  const role = data?.data.role_id.role_name;
  const pathname = usePathname();
  const permissionPath = pathname?.split("/")[2];

  const renderTitle = (title: string, data: any) => (
    <p className="mb-2 flex items-center text-[20px] font-semibold text-primary">
      {title}{" "}
      <span className="ml-3 rounded-full bg-primary bg-opacity-20 px-3 py-1 text-xs font-normal text-primary lg:text-[13px]">
        {isLoading ? "Loading..." : data} {title}
      </span>
    </p>
  );

  return (
    <section className="mb-[50px] flex w-full flex-col items-start justify-between rounded-none bg-white p-5 shadow-md lg:flex-row lg:items-center lg:rounded-lg">
      <div className="mb-3 flex w-full lg:mb-0">
        <div className="flex flex-col items-start">
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
            {renderTitle(title, totalData)}
            {isSecondTitle && <p className="hidden text-primary lg:block">|</p>}
            {isSecondTitle && renderTitle(secondTitle!, totalSecondData)}
          </div>

          <div className="mt-3 flex items-center space-x-1 lg:mt-0">
            <p className="text-[15px] text-primary lg:text-[16px]">
              Kumpulan berbagai {title}
            </p>
            {isSecondTitle && (
              <p className="text-[15px] text-primary lg:text-[16px]">
                & {secondTitle}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        {permissionPath === "artikel" ? (
          <RouteButton
            to={navigateTo}
            title={`Tambah ${title}`}
            width={"100%"}
            bg={"primary"}
            color={"white"}
            justifyContent="flex-start"
            _hover={{ bg: "secondary" }}
            leftIcon={<FaSquarePlus color="#ffffff" />}
          />
        ) : role === "Admin" ? (
          <RouteButton
            to={navigateTo}
            title={`Tambah ${title}`}
            width={"100%"}
            bg={"primary"}
            color={"white"}
            justifyContent="flex-start"
            _hover={{ bg: "secondary" }}
            leftIcon={<FaSquarePlus color="#ffffff" />}
          />
        ) : undefined}
      </div>
    </section>
  );
};

export default SecondTopNav;
