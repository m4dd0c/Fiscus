"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/shared/Loader";

const PlaidAccounts = () => {
 const [accounts, setAccounts] = useState<any[]>([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 const fetchAccounts = async () => {
  setLoading(true);
  setError("");

  try {
   const response = await axios.get("/api/plaid/accounts");

   setAccounts(response.data.accounts);
  } catch (err) {
   console.error("Error fetching accounts:", err);
   setError("Failed to fetch accounts.");
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchAccounts();
 }, []);

 return loading ? (
  <Loader />
 ) : (
  <div className="p-6 rounded-md shadow-md">
   <h2 className="text-xl font-bold mb-4">Connected Bank Accounts</h2>

   {error && <p className="text-red-500 mt-2">{error}</p>}

   <ul className="mt-4">
    {accounts.map((account) => (
     <li key={account.account_id} className="border p-2 rounded mb-2">
      <p className="font-semibold">{account.name}</p>
      <p>Type: {account.subtype}</p>
      <p>Balance: ${account.balances.current}</p>
     </li>
    ))}
   </ul>
  </div>
 );
};

export default PlaidAccounts;
