"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";
import { Provider } from "react-redux";

import { store } from "@/src/redux/store";
import ReduxPersistGate from "@/src/redux/ReduxPersistGate";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <ReduxPersistGate>
        <HeroUIProvider navigate={router.push}>
          <Toaster position="top-center" />
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </HeroUIProvider>
      </ReduxPersistGate>
    </Provider>
  );
}
