import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getRandomTemplate } from '@/lib/emailTemplates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, pledge } = await req.json();

    if (!name || !email || !pledge) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const html = getRandomTemplate(name, pledge);

    const { data, error } = await resend.emails.send({
      from: 'Elixios Earth Day <noreply@elixios.in>',
      to: email,
      subject: `${name}, The Earth Has Heard Your Pledge 🌍`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
