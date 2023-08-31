import './globals.css';

import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import ReactQuery from '@/component/ReactQuery';
import CustomChakra from '@/component/CustomChakra';
import NextAuthProvider from '@/component/NextAuthProvider';
import { Session } from 'next-auth';
import Nav from './nav';
import 'react-responsive-datepicker/dist/index.css';

interface NextAuthProps {
  children: ReactNode;
  session: Session | null | undefined;
}
export const metadata = {
  title: 'Al - Hilal',
  description: 'website umroh',
};

const RootLayout: React.FC<NextAuthProps> = ({ children, session }) => {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider session={session}>
          <ReactQuery>
            <CustomChakra>
              <section className="w-full h-full">{children}</section>
            </CustomChakra>
          </ReactQuery>
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
