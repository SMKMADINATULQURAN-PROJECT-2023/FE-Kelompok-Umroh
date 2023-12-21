import { NextPage } from "next";
import React from "react";
import PanduanSection from "./sections/panduan.section";

interface Props {}

const Panduan: NextPage<Props> = ({}) => {
  return (
    <div className="">
      <PanduanSection />
    </div>
  );
};

export default Panduan;
