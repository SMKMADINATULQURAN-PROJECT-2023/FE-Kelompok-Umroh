import { CustomHeader } from "@/components";
import type { NextPage } from "next";
import ZiarahSection from "./sections/ziarah.section";

const Ziarah: NextPage = () => {
  return (
    <div className="h-full w-full">
      <CustomHeader />
      <ZiarahSection />
    </div>
  );
};

export default Ziarah;
