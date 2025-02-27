import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/service/Plaid";

export async function POST(req: NextRequest) {
 try {
  const { access_token } = await req.json();
  const response = await client.accountsGet(access_token);
  const accounts = response.data.accounts;
  return NextResponse.json({ accounts });
 } catch (error) {
  return NextResponse.json(
   { error: "Error generating link token" },
   { status: 500 }
  );
 }
}
