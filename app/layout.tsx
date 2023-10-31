import "./globals.css";

import React, { ReactNode } from "react";
import ReactQuery from "@/component/ReactQuery";
import CustomChakra from "@/component/CustomChakra";
import NextAuthProvider from "@/component/NextAuthProvider";
import { Session } from "next-auth";
import ProgressBarClient from "@/component/ProgressBar";

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
