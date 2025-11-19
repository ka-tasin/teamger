"use client";

import { useState } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";

type ToastProps = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    setToasts((prev) => [...prev, props]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  };

  const Toaster = () => (
    <ToastPrimitive.Provider>
      {toasts.map((t, i) => (
        <ToastPrimitive.Root key={i} className={`bg-white shadow p-4 rounded ${t.variant === "destructive" ? "bg-red-500 text-white" : ""}`}>
          <ToastPrimitive.Title>{t.title}</ToastPrimitive.Title>
          {t.description && <ToastPrimitive.Description>{t.description}</ToastPrimitive.Description>}
          <ToastPrimitive.Viewport />
        </ToastPrimitive.Root>
      ))}
    </ToastPrimitive.Provider>
  );

  return { toast, Toaster };
};
