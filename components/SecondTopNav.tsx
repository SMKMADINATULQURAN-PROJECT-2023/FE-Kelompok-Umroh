import React from "react";
import RouteButton from "./RouteButton";
import { FaSquarePlus } from "react-icons/fa6";

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
  const renderTitle = (title: string, data: any) => (
    <p className="mb-2 text-[20px] font-semibold text-white flex items-center">
      {title}{" "}
      <span className="ml-3 rounded-[22px] bg-[#ffffff65] px-2 py-1 text-[11px] lg:text-[13px] font-normal text-white">
        {isLoading ? "Loading..." : data} {title}
      </span>
    </p>
  );

  return (
    <section className="mb-[50px] flex w-full flex-col items-start lg:items-center justify-between rounded-none bg-primary p-5 lg:flex-row lg:rounded-[10px]">
      <div className="flex w-full mb-3 lg:mb-0">
        <div className="flex flex-col items-start">
          <div className="flex flex-col lg:items-center lg:space-x-4 lg:flex-row">
            {renderTitle(title, totalData)}
            {isSecondTitle && <p className="hidden text-white lg:block">|</p>}
            {isSecondTitle && renderTitle(secondTitle!, totalSecondData)}
          </div>

          <div className="flex items-center space-x-1 mt-3 lg:mt-0">
            <p className="text-white text-[15px] lg:text-[16px]">Kumpulan berbagai {title}</p>
            {isSecondTitle && <p className="text-white text-[15px] lg:text-[16px]">& {secondTitle}</p>}
          </div>
        </div>
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
