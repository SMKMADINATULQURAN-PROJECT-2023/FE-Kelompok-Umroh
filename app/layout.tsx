import "./globals.css";

import React, { ReactNode } from "react";
import ReactQuery from "@/components/ReactQuery";
import CustomChakra from "@/components/CustomChakra";
import NextAuthProvider from "@/components/NextAuthProvider";
import { Session } from "next-auth";
import ProgressBarClient from "@/components/ProgressBar";

interface NextAuthProps {
  children: ReactNode;
  session: Session | null | undefined;
}
export const metadata = {
  title: "Al - Hilal",
  description: "website umroh",
};

const RootLayout: React.FC<NextAuthProps> = ({ children, session }) => {
  return (
    <>
      <html lang="en">
        <body>
          <NextAuthProvider session={session}>
            <ReactQuery>
              <CustomChakra>
                <section className="h-full w-full">
                  <div className="h-7 flex justify-center items-center w-screen bg-cyan-400 font-semibold text-white sticky top-0 z-[800]">
                    DEMO VERSION
                  </div>
                  <ProgressBarClient />
                  {children}
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
