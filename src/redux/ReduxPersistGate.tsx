
"use client";

import { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/src/redux/store";

type ReduxPersistGateProps = {
  children: ReactNode;
};

export default function ReduxPersistGate({ children }: ReduxPersistGateProps) {
  return <PersistGate loading={null} persistor={persistor}>{children}</PersistGate>;
}
