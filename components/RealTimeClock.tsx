import React, { useEffect, useState } from "react";

interface props {}

const RealTimeClock: React.FC<props> = ({}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("id-ID");

  return (
    <p className="text-sm text-primary">{`${formattedDate} - ${formattedTime}`}</p>
  );
};

export default RealTimeClock;
