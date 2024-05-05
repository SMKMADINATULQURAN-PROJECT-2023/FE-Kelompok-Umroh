import "./globals.css";

import { Poppins } from "next/font/google";
import React, { ReactNode } from "react";
import ReactQuery from "@/components/ReactQuery";
import CustomChakra from "@/components/CustomChakra";
import NextAuthProvider from "@/components/NextAuthProvider";
import { Session } from "next-auth";
import ProgressBarClient from "@/components/ProgressBar";
import ScrollToTopButton from "@/components/ScrollToTopButton";

interface NextAuthProps {
  children: ReactNode;
  session: Session | null | undefined;
}

const poppins = Poppins({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rihlatul",
  description: "website umroh",
};

const RootLayout: React.FC<NextAuthProps> = ({ children, session }) => {
  return (
    <>
      <html lang="en">
        <body className={poppins.className}>
          <NextAuthProvider session={session}>
            <ReactQuery>
              <CustomChakra>
                <section className="h-full w-full">
                  {/* <div className="sticky top-0 z-[800] flex h-7 w-screen items-center justify-center bg-cyan-400 font-semibold text-white">
                    DEMO VERSION
                  </div> */}
                  <ProgressBarClient />
                  {children}
                  <ScrollToTopButton />
                </section>
              </CustomChakra>
            </ReactQuery>
          </NextAuthProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
