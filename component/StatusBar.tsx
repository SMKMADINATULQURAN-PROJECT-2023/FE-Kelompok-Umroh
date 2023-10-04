'use client';
import React from 'react';

interface CustomButtonProps {}
const style = `rounded-[5px] text-white py-1 px-2 text-[12px] flex justify-center items-center`

export const StatusBarApproved: React.FC<CustomButtonProps> = ({
  ...props
}) => {
  return (
    <div
      className={`${style} bg-green-500`}
    >
      Diterima
    </div>
  );
};

export const StatusBarProcessed: React.FC<CustomButtonProps> = ({
  ...props
}) => {
  return (
    <div
      className={`${style} bg-yellow-500`}
    >
      Diproses
    </div>
  );
};

export const StatusBarRejected: React.FC<CustomButtonProps> = ({
  ...props
}) => {
  return (
    <div
      className={`${style} bg-red-500`}
    >
      Ditolak
    </div>
  );
};
