// import bot from "@/lib/telegram";
import bot from "@/app/telegram";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("Received update:", body); // <-- log incoming update
    await bot.handleUpdate(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err); // <-- log the error
    return NextResponse.json({ ok: false, error: (err as any).message });
  }
};

export const GET = () => NextResponse.json({ status: "Bot API running" });
