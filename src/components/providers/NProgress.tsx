"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NProgress = () => {
  return (
    <ProgressBar
      height="3px"
      color="#2196F3"
      options={{ showSpinner: false }}
    />
  );
};

export default NProgress;
