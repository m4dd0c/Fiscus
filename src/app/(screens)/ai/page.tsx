import React from "react";
import Link from "next/link";

const Page = () => {
 return (
  <div>
   Gemini
   <Link className="bg-green-500" href="/dashboard">
    dashboard
   </Link>
  </div>
 );
};

export default Page;
