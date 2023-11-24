"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";
import React, { ReactNode, useMemo, useState } from "react";
import {
  FaHouseChimney,
  FaUser,
  FaPlaneDeparture,
  FaMapLocationDot,
  FaFilePen,
  FaHandsHolding,
  FaBars,
} from "react-icons/fa6";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import LayoutMobile from "./layoutMobile";

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
        icon: <FaHouseChimney color="#ffffff" />,
      },
      {
        nav: "user",
        isDisabled: false,
        to: "/admin/user",
        icon: <FaUser color="#ffffff" />,
      },
      {
        nav: "paket",
        isDisabled: true,
        to: "/admin/paket",
        icon: <FaPlaneDeparture color="#ffffff" />,
      },
      {
        nav: "ziarah",
        isDisabled: false,
        to: "/admin/ziarah",
        icon: <FaMapLocationDot color="#ffffff" />,
      },
      {
        nav: "artikel",
        isDisabled: false,
        to: "/admin/artikel",
        icon: <FaFilePen color="#ffffff" />,
      },
      {
        nav: "doa",
        isDisabled: false,
        to: "/admin/doa",
        icon: <FaHandsHolding color="#ffffff" />,
      },
      {
        nav: "panduan",
        isDisabled: false,
        to: "/admin/panduan",
        icon: <FaHandsHolding color="#ffffff" />,
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
        <section className="noScrollbar sticky top-0 col-span-1 hidden  h-screen w-full flex-col items-center justify-start space-y-2 overflow-y-scroll rounded-tr-[50px] bg-primary px-5 py-[30px] lg:flex">
          <div className="mb-[50px] w-full text-center text-[25px] font-extrabold uppercase text-white underline underline-offset-4">
            al - hilal
          </div>
          <div className="grid w-full grid-cols-1 gap-y-5">
            {dashmenu.map((_, i) => {
              const isSelected = currentNav === _.nav;
              return (
                <Link href={`/admin/${_.nav.toLowerCase()}`} key={i}>
                  <Button
                    fontSize={15}
                    key={i}
                    width={"full"}
                    type="button"
                    height="50px"
                    transition="all 200ms ease-in-out"
                    isDisabled={_.isDisabled}
                    textTransform="capitalize"
                    color={isSelected ? "#262a56" : "#ffffff"}
                    variant={isSelected ? "solid" : "ghost"}
                    backgroundColor={isSelected ? "#ffffff" : "#262a56"}
                    _hover={{
                      backgroundColor: "#ffffff66",
                      transition: "all 200ms ease-in-out",
                    }}
                  >
                    {_.nav}
                  </Button>
                </Link>
              );
            })}
          </div>
        </section>

        <LayoutMobile data={dashmenu} currentNav={currentNav} />

        <section className="col-span-6 pb-7 lg:p-5">{children}</section>
      </section>
    </>
  );
};

export default RootLayout;
