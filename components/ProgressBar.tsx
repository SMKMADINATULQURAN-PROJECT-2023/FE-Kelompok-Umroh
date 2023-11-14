"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarClient = () => {
  return (
    <div>
      <ProgressBar
        height="3px"
        color="#3182ce"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </div>
  );
};

export default ProgressBarClient;
