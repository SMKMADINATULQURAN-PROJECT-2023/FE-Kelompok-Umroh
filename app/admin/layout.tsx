"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";
import React, { ReactNode, useMemo } from "react";
import {
  FaHouseChimney,
  FaUser,
  FaPlaneDeparture,
  FaMapLocationDot,
  FaHandsHolding,
} from "react-icons/fa6";
import Link from "next/link";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import LayoutMobile from "./layoutMobile";
import { MdArticle, MdPermDeviceInformation } from "react-icons/md";

interface AdminLayoutProps {
  children: ReactNode;
}
const RootLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const currentNav = pathname?.split("/")[2];

  const dashmenu = useMemo(
    () => [
      {
        nav: "dashboard",
        isDisabled: false,
        to: "/admin/dashboard",
        icon: FaHouseChimney,
      },
      {
        nav: "user",
        isDisabled: false,
        to: "/admin/user",
        icon: FaUser,
      },
      {
        nav: "paket",
        isDisabled: true,
        to: "/admin/paket",
        icon: FaPlaneDeparture,
      },
      {
        nav: "ziarah",
        isDisabled: false,
        to: "/admin/ziarah",
        icon: FaMapLocationDot,
      },
      {
        nav: "artikel",
        isDisabled: false,
        to: "/admin/artikel",
        icon: MdArticle,
      },
      {
        nav: "doa",
        isDisabled: false,
        to: "/admin/doa",
        icon: FaHandsHolding,
      },
      {
        nav: "panduan",
        isDisabled: false,
        to: "/admin/panduan",
        icon: MdPermDeviceInformation,
      },
    ],
    [],
  );

  return (
    <>
      <Head>
        <title>jkt48</title>
        <meta name="description" content="This is the page description." />
      </Head>

      <section className="w-full bg-white lg:grid lg:grid-cols-7">
        <section className="noScrollbar sticky top-0 col-span-1 hidden  h-screen w-full flex-col items-center justify-start space-y-2 overflow-y-scroll bg-white py-[30px] shadow-lg lg:flex">
          <div className="mb-[50px] w-full text-center text-[25px] font-extrabold uppercase text-primary underline underline-offset-4">
            al - hilal
          </div>
          <div className="grid w-full grid-cols-1">
            {dashmenu.map((_, i) => {
              const isSelected = currentNav === _.nav;
              return (
                <Link href={`/admin/${_.nav.toLowerCase()}`} key={i}>
                  <Button
                    fontSize={15}
                    key={i}
                    width={"full"}
                    borderRadius={"none"}
                    py={6}
                    px={10}
                    type="button"
                    height="50px"
                    transition="all 200ms ease-in-out"
                    isDisabled={_.isDisabled}
                    textTransform="capitalize"
                    color={isSelected ? "white" : "#262a56"}
                    variant={isSelected ? "ghost" : "solid"}
                    backgroundColor={isSelected ? "#262a56" : "white"}
                    _hover={{
                      backgroundColor: "#9FA1B5",
                      color: "white",
                      transition: "all 200ms ease-in-out",
                    }}
                  >
                    <Flex justifyContent="start" alignItems="center" w="full">
                      <Icon as={_.icon} mr={4} />{" "}
                      {/* replace FaHome with your icon */}
                      <Box>{_.nav}</Box>
                    </Flex>
                  </Button>
                </Link>
              );
            })}
          </div>
        </section>

        <LayoutMobile data={dashmenu} currentNav={currentNav} />

        <section className="col-span-6 bg-sectionBg pb-7 lg:p-5">
          {children}
        </section>
      </section>
    </>
  );
};

export default RootLayout;
