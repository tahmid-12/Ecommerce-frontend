"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = ({ children }) => {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "text-md",
          duration: 1000,
        }}
      />
      {children}
    </>
  );
};
