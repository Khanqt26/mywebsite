import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!botToken || !chatId) {
      console.error('Contact API configuration error: missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
      return NextResponse.json(
        { error: 'Contact service is not configured yet. Please try again later.' },
        { status: 500 }
      );
    }

    const telegramMessage = [
      'New Portfolio Message',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject || 'No subject'}`,
      `Message: ${message}`,
      '',
      `Sent: ${new Date().toLocaleString()}`,
    ].join('\n');

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
      }),
    });

    if (!response.ok) {
      const telegramError = await response.text();
      console.error('Telegram API error:', telegramError);
      return NextResponse.json(
        { error: 'Telegram rejected the request. Verify TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, and that you started the bot chat.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Contact service failed on server. Check Vercel Function logs for /api/contact.' },
      { status: 500 }
    );
  }
}
