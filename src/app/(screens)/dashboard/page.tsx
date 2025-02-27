"use client";
import { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/shared/Loader";

const PlaidLinkComponent = () => {
 const [linkToken, setLinkToken] = useState<string | null>(null);
 const { user, isSignedIn, isLoaded } = useUser();

 // generating temp link token
 useEffect(() => {
  const createLinkToken = async () => {
   if (!user) return;
   try {
    const response = await axios.post("/api/plaid/create-link-token", {
     client_user_id: user?.id, // Replace with actual user ID
    });
    setLinkToken(response.data.link_token);
   } catch (error) {
    console.error("Error generating link token:", error);
   }
  };
  if (isLoaded && isSignedIn) createLinkToken();
 }, [isLoaded, isSignedIn, user]);

 // generating access token
 const onSuccess = async (public_token: string) => {
  try {
   const { data } = await axios.post("/api/plaid/exchange-token", {
    public_token,
   });
   console.log("Access Token:", data.access_token);
  } catch (error) {
   console.error("Error exchanging public token:", error);
  }
 };

 // using plaid fe lib to open plaid window
 const { open, ready } = usePlaidLink({
  token: linkToken!,
  onSuccess,
 });

 return !isLoaded ? (
  <Loader />
 ) : (
  <div>
   {linkToken && (
    <button onClick={() => open()} disabled={!ready}>
     Connect Bank
    </button>
   )}
  </div>
 );
};

export default PlaidLinkComponent;
