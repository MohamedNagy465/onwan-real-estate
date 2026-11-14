import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (
    name.length < 2 ||
    !EMAIL_PATTERN.test(email) ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: "Please check the form fields." },
      { status: 400 }
    );
  }

  // TODO: deliver the message. Send it by email (Resend, Nodemailer...) or
  // save it in your database. For now it is only logged on the server.
  console.log("New contact message:", { name, email, phone, message });

  return NextResponse.json({ ok: true });
}