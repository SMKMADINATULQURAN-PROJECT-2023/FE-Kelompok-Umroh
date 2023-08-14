"use client";

import { Avatar, Button } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession();
  const pahtname = usePathname()
  return (
    <nav className=" flex items-center justify-between h-[100px]  bg-red-500 shadow-lg px-5 py-2">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          SMK MADINATULQURAN
        </h1>
      </Link>

     
      <div >
        {session === null && !pahtname?.split("/").includes('login') && (
          <Link href={"/auth/login"}>
            <Button>Login</Button>
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
  );
};

export default Nav;
