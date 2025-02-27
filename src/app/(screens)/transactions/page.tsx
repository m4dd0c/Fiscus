"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Transactions = () => {
 const [transactions, setTransactions] = useState([]);

 useEffect(() => {
  const fetchTransactions = async () => {
   try {
    const response = await axios.get("/api/plaid/transactions");
    console.log(response.data.transactions, "feeel");
    setTransactions(response.data.transactions);
   } catch (error) {
    console.error("Error fetching transactions:", error);
   }
  };

  fetchTransactions();
 }, []);

 return (
  <div>
   <h2 className="text-xl font-bold">Transactions</h2>
   <ul>
    {transactions.map((tx: any) => (
     <li key={tx.transaction_id}>
      {tx.date} - {tx.name} - ${tx.amount}
     </li>
    ))}
   </ul>
  </div>
 );
};

export default Transactions;
