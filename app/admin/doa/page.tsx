import { CustomHeader } from "@/components";
import type { NextPage } from "next";
import React from "react";
import DoaSection from "./sections/doa.section";

interface Props {}

const Doa: NextPage<Props> = () => {
  return (
    <div className="h-full w-full">
      <CustomHeader />
      <DoaSection />
    </div>
  );
};

export default Doa;
