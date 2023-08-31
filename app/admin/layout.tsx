'use client';
import { Button } from '@chakra-ui/react';
import Head from 'next/head';
import React, { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}
const RootLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>jkt48</title>
        <meta name="description" content="This is the page description." />
      </Head>
      <section className="grid grid-cols-7 w-full h-screen">
        <section className="col-span-1 w-full h-full py-[30px] px-5 bg-primary space-y-2 rounded-tr-[50px]">
          <div className="uppercase underline underline-offset-4 text-white w-full text-center text-[25px] font-extrabold mb-[40px]">
            al - hilal
          </div>
          {[1, 2, 3, 4, 5, 6, 7].map((_, i) => {
            return (
              <Button
                width={'full'}
                type="button"
                // isLoading={isLoading}
                // isDisabled={isLoading}
                h="50px"
                backgroundColor={'#1564C0'}
                _hover={{ bgColor: '#034fa4' }}
              >
                LOGIN
              </Button>
            );
          })}
        </section>
        <section className="col-span-6 p-5">{children}</section>
      </section>
    </>
  );
};

export default RootLayout;
