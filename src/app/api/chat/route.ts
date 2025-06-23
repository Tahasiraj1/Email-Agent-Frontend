import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const lastMessage = messages[messages.length - 1];

    const response = await fetch("http://127.0.0.1:8000/chat", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lastMessage)
    })

    const data = await response.json();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
  }
}

export async function GET() {
  try {
    const response = await fetch("http://127.0.0.1:8000/logs", {
      method: 'GET',
    })

    const data = await response.json();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
  }
}