"use client";
import React, { useState } from "react";
import { Calendar as ReactCalendar } from "react-calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div suppressHydrationWarning>
      <ReactCalendar
        onChange={onChange}
        value={value}
        className="react-calendar rounded-[10px] w-full h-full"
      />
    </div>
  );
};

export default Calendar;
