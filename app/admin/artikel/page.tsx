import type { NextPage } from "next";
import { CustomHeader } from "@/components";
import ArtikelSection from "./sections/artikel.section";

const Artikel: NextPage = () => {
  return (
    <div className="">
      <ArtikelSection />
    </div>
  );
};

export default Artikel;
