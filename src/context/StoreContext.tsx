"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { createContext } from "react";

interface iStoreContext {
 user: any;
}

const StoreContext = createContext<iStoreContext | null>(null);

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
 const user = useUser();
 return <StoreContext value={{ user }}>{children}</StoreContext>;
};

export { StoreContext, StoreProvider };
