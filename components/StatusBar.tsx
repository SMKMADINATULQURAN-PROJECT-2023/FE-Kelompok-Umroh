import React from "react";

interface CustomButtonProps {
  className?: string | undefined;
}

const style = `rounded-[5px] text-white py-1 px-2 text-[12px] flex justify-center items-center`;

export const StatusBarApproved: React.FC<CustomButtonProps> = ({
  className,
}) => {
  return <div className={`${className} ${style} bg-green-500`}>Diterima</div>;
};

export const StatusBarProcessed: React.FC<CustomButtonProps> = ({
  className,
}) => {
  return <div className={`${className} ${style} bg-yellow-500`}>Diproses</div>;
};

export const StatusBarRejected: React.FC<CustomButtonProps> = ({
  className,
}) => {
  return <div className={`${className} ${style} bg-red-500`}>Ditolak</div>;
};

export const StatusBarUknown: React.FC<CustomButtonProps> = ({
  className,
}) => {
  return <div className={`${className} ${style} bg-black text-white`}>Unknown</div>;
};
