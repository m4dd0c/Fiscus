import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/service/Plaid";

export async function POST(req: NextRequest) {
 const { public_token } = await req.json();
 try {
  const response = await client.itemPublicTokenExchange({ public_token });
  const { access_token } = response.data;
  return NextResponse.json({ access_token });
 } catch (error) {
  return NextResponse.json(
   { error: "Error exchanging public token", stack: error },
   { status: 500 }
  );
 }
}
