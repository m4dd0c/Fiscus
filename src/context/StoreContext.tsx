"use client";
import { useUser } from "@clerk/nextjs";
import React, { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";

interface iStoreContext {
 user: any;
 accessToken: null | string;
 setAccessToken: Dispatch<SetStateAction<null | string>>;
}

const StoreContext = createContext<iStoreContext | null>(null);

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
 const user = useUser();
 const [accessToken, setAccessToken] = useState<null | string>(null);
 return (
  <StoreContext value={{ user, accessToken, setAccessToken }}>
   {children}
  </StoreContext>
 );
};

export { StoreContext, StoreProvider };
