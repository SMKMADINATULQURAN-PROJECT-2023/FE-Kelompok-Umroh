"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarClient = () => {
  return (
    <div className="relative z-[9999]">
      <ProgressBar
        height="4px"
        color="#1E5236"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </div>
  );
};

export default ProgressBarClient;
