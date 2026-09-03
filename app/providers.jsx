"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export function Providers({ children }) {
  return (
    <HeroUIProvider>
      <div suppressHydrationWarning className="contents">
        {children}
        <ToastContainer position="bottom-right" theme="dark" />
      </div>
    </HeroUIProvider>
  );
  
}
export function Providers({ children }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}