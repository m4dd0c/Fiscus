import React from "react";
import Link from "next/link";

const Page = () => {
 return (
  <>
   <div>Transactions</div>
   <Link className="bg-green-500" href="/dashboard">
    dashboard
   </Link>
   <div>
    <ul>
     <li>
      <h1>from: </h1>
      <h1>to: </h1>
      <h1>amount: </h1>
     </li>
    </ul>
   </div>
  </>
 );
};

export default Page;
