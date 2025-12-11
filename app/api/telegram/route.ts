// import bot from "@/lib/telegram";
import bot from "@/app/telegram";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  await bot.handleUpdate(body); // pass incoming update to your bot
  return NextResponse.json({ ok: true });
};

export const GET = () => NextResponse.json({ status: "Bot API running" });
