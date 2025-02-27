"use client";
import React from "react";
import Link from "next/link";

const Page = () => {
 return (
  <div>
   <form>
    <label>from</label>
    <input type="text" />
    <label>to</label>
    <input type="text" />
    <label>amount</label>
    <input type="number" />
    <button>Send Funds</button>
   </form>
   <Link className="bg-green-500" href="/dashboard">
    Dashboard
   </Link>
  </div>
 );
};

export default Page;
