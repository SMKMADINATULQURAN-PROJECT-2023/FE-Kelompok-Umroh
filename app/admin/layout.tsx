"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import {
  FaHouseChimney,
  FaUser,
  FaPlaneDeparture,
  FaMapLocationDot,
  FaHandsHolding,
} from "react-icons/fa6";
import Link from "next/link";
import {
  Box,
  Button,
  Flex,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import LayoutMobile from "./layoutMobile";
import { MdArticle, MdPermDeviceInformation } from "react-icons/md";
import { IconType } from "react-icons/lib";

const dashmenu = [
  {
    nav: "dashboard",
    isDisabled: false,
    to: "/admin/dashboard",
    icon: FaHouseChimney,
    isMultiple: false,
    multipleNav: [],
  },
  {
    nav: "user",
    isDisabled: false,
    to: "/admin/user",
    icon: FaUser,
    isMultiple: true,
    multipleNav: [
      { name: "user admin", to: "user/admin" },
      { name: "user mobile", to: "user/mobile" },
    ],
  },
  {
    nav: "paket",
    isDisabled: true,
    to: "/admin/paket",
    icon: FaPlaneDeparture,
    isMultiple: false,
    multipleNav: [],
  },
  {
    nav: "ziarah",
    isDisabled: false,
    to: "/admin/ziarah",
    icon: FaMapLocationDot,
    isMultiple: false,
    multipleNav: [],
  },
  {
    nav: "artikel",
    isDisabled: false,
    to: "/admin/artikel",
    icon: MdArticle,
    isMultiple: false,
    multipleNav: [],
  },
  {
    nav: "doa",
    isDisabled: false,
    to: "/admin/doa",
    icon: FaHandsHolding,
    isMultiple: true,
    multipleNav: [
      { name: "doa", to: "doa" },
      { name: "kategori doa", to: "doa/kategori" },
    ],
  },
  {
    nav: "panduan",
    isDisabled: false,
    to: "/admin/panduan",
    icon: MdPermDeviceInformation,
    isMultiple: false,
    multipleNav: [],
  },
];

const NavigationButton = ({
  isSelected,
  isMultiple,
  isDisabled,
  icon,
  name,
  to,
}: {
  isSelected: boolean;
  isMultiple: boolean;
  isDisabled: boolean;
  icon: IconType;
  name: string;
  to: string;
}) => (
  <Link href={to} className={`${isDisabled ? "hidden" : "block"}`}>
    <Button
      fontSize={15}
      width={"full"}
      borderRadius={"none"}
      py={6}
      pl={isMultiple ? 14 : 10}
      type="button"
      height="50px"
      fontWeight={isSelected ? "bold" : "normal"}
      transition="all 200ms ease-in-out"
      isDisabled={isDisabled}
      textTransform="capitalize"
      color={"primary"}
      boxShadow={
        isSelected ? "inset 5px 0px 0px 0px rgba(30,82,54,1)" : "none"
      }
      variant={isSelected ? "ghost" : "solid"}
      backgroundColor={isSelected ? "rgba(30, 82, 54, 0.2)" : "white"}
      _hover={{
        backgroundColor: "primary",
        color: "white",
        transition: "all 200ms ease-in-out",
      }}
    >
      <Flex justifyContent="start" alignItems="center" w="full">
        <Icon as={icon} mr={4} /> <Box>{name}</Box>
      </Flex>
    </Button>
  </Link>
);

interface AdminLayoutProps {
  children: ReactNode;
}
const RootLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const currentNav = pathname?.split("/")[2];
  const nav = pathname?.split("/");
  const multipleNav = nav ? nav[nav.length - 1] : undefined;

  return (
    <>
      <section className="w-full bg-white lg:grid lg:grid-cols-7">
        <section className="noScrollbar sticky top-0 col-span-1 hidden h-screen w-full flex-col items-center justify-start space-y-12 overflow-y-scroll bg-white py-[30px] shadow-lg lg:flex">
          <Link href={"/admin/dashboard"}>
            <div className="w-full text-center text-[25px] font-extrabold uppercase text-primary underline underline-offset-4">
              al - hilal
            </div>
          </Link>
          <div className="grid w-full grid-cols-1">
            {dashmenu.map((_, i) => {
              const isSelected = currentNav === _.nav;
              return _.isMultiple ? (
                <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem border={"none"}>
                    <h2>
                      <AccordionButton
                        pl={10}
                        py={3}
                        _hover={{
                          backgroundColor: "primary",
                          color: "white",
                          transition: "all 200ms ease-in-out",
                        }}
                      >
                        <Flex
                          justifyContent="start"
                          alignItems="center"
                          w="full"
                        >
                          <Icon as={_.icon} mr={4} />{" "}
                          <Box fontWeight={"medium"}>{_.nav}</Box>
                        </Flex>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} px={0} py={0}>
                      {_.multipleNav.map((item, index) => (
                        <NavigationButton
                          isMultiple={_.isMultiple}
                          isSelected={multipleNav === item.to.split("/").pop()}
                          isDisabled={_.isDisabled}
                          icon={_.icon}
                          name={item.name}
                          to={`/admin/${item.to.toLowerCase()}`}
                        />
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ) : (
                <NavigationButton
                  isMultiple={_.isMultiple}
                  isSelected={isSelected}
                  isDisabled={_.isDisabled}
                  icon={_.icon}
                  name={_.nav}
                  to={`/admin/${_.nav.toLowerCase()}`}
                />
              );
            })}
          </div>
        </section>

        <LayoutMobile
          data={dashmenu}
          currentNav={currentNav}
          multipleNav={multipleNav}
        />

        <section className="col-span-6 bg-[#eff2f8] pb-7 lg:p-5">
          {children}
        </section>
      </section>
    </>
  );
};

export default RootLayout;
