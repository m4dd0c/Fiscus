import { type Metadata } from "next";
import Link from "next/link";
import {
 SignInButton,
 SignUpButton,
 SignedIn,
 SignedOut,
 UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Providers from "@/context/Providers";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

export const metadata: Metadata = {
 title: "Clerk Next.js Quickstart",
 description: "Generated by create next app",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <body
    className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}
   >
    <Providers>
     <>
      <header className="bg-black z-50 flex justify-between items-center fixed top-0 inset-x-0 p-4 gap-4 h-16">
       <Link className="space-x-4 flex items-center" href="/">
        <span className="font-bold text-orange-500 text-5xl">₹</span>
        <span className="font-semibold text-2xl">Fiscus</span>
       </Link>
       <div className="space-x-4">
        <SignedOut>
         <SignInButton />
         <SignUpButton />
        </SignedOut>
        <SignedIn>
         <UserButton />
        </SignedIn>
       </div>
      </header>
      <main className="pt-16">{children}</main>
     </>
    </Providers>
   </body>
  </html>
 );
}
