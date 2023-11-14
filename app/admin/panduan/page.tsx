import { CustomHeader } from "@/components";
import { NextPage } from "next";
import React from "react";
import PanduanSection from "./sections/panduan.section";

interface Props {}

const Panduan: NextPage<Props> = ({}) => {
  return (
    <div className="h-full w-full">
      <CustomHeader />
      <PanduanSection />
    </div>
  );
};

export default Panduan;
