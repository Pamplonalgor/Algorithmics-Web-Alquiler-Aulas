import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, subject, html, adminEmail, type } = await request.json();

    // 1. Send confirmation to the customer
    const customerEmail = await resend.emails.send({
      from: 'Aula Web <onboarding@resend.dev>',
      to: [to],
      subject: subject || 'Confirmación de solicitud - Aula Web',
      html: html || '<p>Hemos recibido tu solicitud. Pronto nos pondremos en contacto contigo.</p>',
    });

    // 2. Send notification to the administrator
    const adminNotification = await resend.emails.send({
      from: 'Sistema Aula Web <onboarding@resend.dev>',
      to: [adminEmail || 'pamplona@algoacademy.es'],
      subject: `Nueva solicitud de ${type || 'Contacto'}`,
      html: `
        <h2>Nueva solicitud recibida</h2>
        <p><strong>De:</strong> ${to}</p>
        <p><strong>Tipo:</strong> ${type || 'General'}</p>
        <hr />
        <div>${html}</div>
      `,
    });

    return NextResponse.json({ success: true, customerEmail, adminNotification });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
