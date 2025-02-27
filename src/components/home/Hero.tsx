import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export async function Hero() {
 const isAuth = await auth();
 const redirect = isAuth ? "/dashboard" : "/sign-up";
 return (
  <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
   <h2 className="bg-clip-text text-center text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
    Fiscus, <br /> Take Control of Your Family&apos;s Finances
   </h2>
   <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
    Fiscus is a smart, secure, and AI-powered financial dashboard designed for
    families. Track assets, monitor transactions, get real-time insights, and
    automate alerts—all in one place.
   </p>
   <Link
    className="my-3 z-30 cursor-pointer w-40 h-10 rounded-xl grid place-items-center bg-white text-black border border-black text-sm"
    href={redirect}
   >
    Get Started 🚀
   </Link>
  </BackgroundLines>
 );
}
