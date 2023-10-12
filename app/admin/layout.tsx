"use client";
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import {
  FaHouseChimney,
  FaUser,
  FaSliders,
  FaPlaneDeparture,
  FaMapLocationDot,
  FaFilePen,
  FaHandsHolding,
} from "react-icons/fa6";
import Link from "next/link";

interface AdminLayoutProps {
  children: ReactNode;
}
const RootLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const dashmenu = [
    {
      nav: "dashboard",
      to: "/admin/dashboard",
      icon: <FaHouseChimney color="#ffffff" />,
    },
    { nav: "user", to: "/admin/user", icon: <FaUser color="#ffffff" /> },
    {
      nav: "paket",
      to: "/admin/paket",
      icon: <FaPlaneDeparture color="#ffffff" />,
    },
    {
      nav: "ziarah",
      to: "/admin/ziarah",
      icon: <FaMapLocationDot color="#ffffff" />,
    },
    {
      nav: "artikel",
      to: "/admin/artikel",
      icon: <FaFilePen color="#ffffff" />,
    },
    { nav: "doa", to: "/admin/doa", icon: <FaHandsHolding color="#ffffff" /> },
    {
      nav: "panduan",
      to: "/admin/panduan",
      icon: <FaHandsHolding color="#ffffff" />,
    },
  ];

  const currentNav = pathname?.split("/")[2];

  return (
    <>
      <Head>
        <title>jkt48</title>
        <meta name="description" content="This is the page description." />
      </Head>
      <section className="grid w-full grid-cols-7  bg-white">
        <section className="sticky top-0 col-span-1 flex h-screen w-full flex-col items-center justify-start space-y-2 overflow-y-scroll rounded-tr-[50px] bg-primary px-5 py-[30px]">
          <div className="mb-[50px] w-full text-center text-[25px] font-extrabold uppercase text-white underline underline-offset-4">
            al - hilal
          </div>
          <div className="grid w-full grid-cols-1 gap-y-5">
            {dashmenu.map((_, i) => {
              const isSelected = currentNav === _.nav;
              return (
                <Link href={`/admin/${_.nav.toLowerCase()}`}>
                  <Button
                    fontSize={15}
                    key={i}
                    width={"full"}
                    type="button"
                    height="50px"
                    transition="height 200ms ease-in-out"
                    textTransform="capitalize"
                    color={isSelected ? "#262a56" : "#ffffff"}
                    variant={isSelected ? "solid" : "ghost"}
                    backgroundColor={isSelected ? "#ffffff" : "#262a56"}
                    _hover={{
                      backgroundColor: '#ffffff66',
                      height: "55px",
                      transition: "height 200ms ease-in-out",
                    }}
                  >
                    {_.nav}
                  </Button>
                </Link>
              );
            })}
          </div>
        </section>
        <section className="bg-sectionBg col-span-6 p-5">{children}</section>
      </section>
    </>
  );
};

export default RootLayout;
