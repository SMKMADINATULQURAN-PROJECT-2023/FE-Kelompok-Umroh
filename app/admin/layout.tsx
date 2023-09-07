'use client';
import { Button } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import {
  FaHouseChimney,
  FaUser,
  FaSliders,
  FaPlaneDeparture,
  FaMapLocationDot,
  FaFilePen,
  FaHandsHolding,
} from 'react-icons/fa6';

interface AdminLayoutProps {
  children: ReactNode;
}
const RootLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const dashmenu = [
    {
      nav: 'dashboard',
      to: '/admin/dashboard',
      icon: <FaHouseChimney color="#ffffff" />,
    },
    { nav: 'user', to: '/admin/user', icon: <FaUser color="#ffffff" /> },
    { nav: 'slider', to: '/admin/slider', icon: <FaSliders color="#ffffff" /> },
    {
      nav: 'paket',
      to: '/admin/paket',
      icon: <FaPlaneDeparture color="#ffffff" />,
    },
    {
      nav: 'ziarah',
      to: '/admin/ziarah',
      icon: <FaMapLocationDot color="#ffffff" />,
    },
    {
      nav: 'artikel',
      to: '/admin/artikel',
      icon: <FaFilePen color="#ffffff" />,
    },
    { nav: 'doa', to: '/admin/doa', icon: <FaHandsHolding color="#ffffff" /> },
    {
      nav: 'catatan',
      to: '/admin/catatan',
      icon: <FaFilePen color="#ffffff" />,
    },
  ];

  const currentNav = pathname?.split('/')[2];

  return (
    <>
      <Head>
        <title>jkt48</title>
        <meta name="description" content="This is the page description." />
      </Head>
      <section className="grid grid-cols-7 w-full h-screen  bg-white">
        <section className="col-span-1 w-full h-full py-[30px] flex flex-col overflow-y-scroll justify-start items-center px-5 bg-primary space-y-2 rounded-tr-[50px]">
          <div className="uppercase underline underline-offset-4 text-white w-full text-center text-[25px] font-extrabold mb-[50px]">
            al - hilal
          </div>
          <div className="space-y-4">
            {dashmenu.map((_, i) => {
              const isSelected = currentNav === _.nav;
              return (
                <Button
                  fontSize={15}
                  key={i}
                  width={'full'}
                  type="button"
                  h="50px"
                  textTransform="capitalize"
                  color={isSelected ? '#262a56' : '#ffffff'}
                  variant={isSelected ? 'solid' : 'outline'}
                  backgroundColor={isSelected ? '#ffffff' : '#262a56'}
                  _hover={{
                    borderLeft: isSelected ? '' : '5px solid #ffffff',
                    // bgColor: isSelected ? '#ffffff' : '#ffffff',
                    // color: isSelected ? '' : '#262a56',
                  }}
                  onClick={() => router.push(`/admin/${_.nav.toLowerCase()}`)}
                >
                  {_.nav}
                </Button>
              );
            })}
          </div>
        </section>
        <section className="col-span-6 p-5">{children}</section>
      </section>
    </>
  );
};

export default RootLayout;
