import { CustomHeader } from "@/components";
import type { NextPage } from "next";
import React from "react";
import UserSection from "./sections/user.section";

const User: NextPage = () => {
  return (
    <div className="h-full w-full">
      <CustomHeader />
      <UserSection />
    </div>
  );
};

export default User;
