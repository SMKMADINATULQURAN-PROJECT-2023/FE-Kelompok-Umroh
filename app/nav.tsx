'use client';

import { Avatar, Button } from '@chakra-ui/react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Nav = () => {
  const { data: session } = useSession();
  const pahtname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        // Adjust the scroll threshold as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <section>
      <nav
        className={`fixed w-full z-50 flex items-center justify-between duration-500 top-0  ${
          isScrolled
            ? 'bg-white h-[70px] drop-shadow-md'
            : 'bg-transparent h-[100px]'
        } px-[50px] py-2`}
      >
        <Link href={'/'}>
          <h1
            className={`${
              isScrolled
                ? 'bg-gradient-to-b from-[#fbc86b] to-[#db9e2f]'
                : 'text-white'
            } text-2xl font-bold  bg-clip-text text-transparent`}
          >
            AL - HILAL.
          </h1>
        </Link>

        <div>
          {session === null && !pahtname?.split('/').includes('login') && (
            <Link href={'/auth/login'}>
              <Button
                className=""
                fontWeight={'medium'}
                color={'#ffffff'}
                backgroundColor={'#db9e2f'}
                _hover={{ bg: "#000000" }}
              >
                Login
              </Button>
            </Link>
          )}
          {session && (
            <Button
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </nav>
    </section>
  );
};

export default Nav;
