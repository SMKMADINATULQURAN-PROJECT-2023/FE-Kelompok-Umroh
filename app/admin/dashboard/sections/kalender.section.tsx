import { FC } from "react";
import { FaCalendar } from "react-icons/fa6";
import { Calendar } from "../component";

interface Props {}

const Kalender: FC<Props> = ({}) => {
  return (
    <div className="w-full overflow-hidden rounded-[10px] bg-white p-5 shadow-md">
      <div className="mb-[10px] flex  items-center space-x-3">
        <div className="rounded-[5px] bg-primary p-3">
          <FaCalendar className="text-lg text-white" />
        </div>
        <p className="text-lg font-bold capitalize text-primary">Kalender</p>
      </div>
      <Calendar />
    </div>
  );
};

export default Kalender;
