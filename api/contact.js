export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !service || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const serviceLabels = {
    smp: 'Scalp Micropigmentation',
    hair: 'Hair & Scalp Treatments',
    beauty: 'Advanced Beauty',
    general: 'General Enquiry',
  };

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'subtl. Website', email: 'hello@subtl.co.uk' },
        to: [{ email: 'hello@subtl.co.uk', name: 'subtl.' }],
        replyTo: { email, name },
        subject: `New enquiry — ${serviceLabels[service] || service}`,
        htmlContent: `
          <div style="font-family:Georgia,serif;color:#111;max-width:560px;margin:0 auto">
            <h2 style="font-weight:300;font-size:1.6rem;margin-bottom:1.4rem">New enquiry from subtl. website</h2>
            <table style="width:100%;border-collapse:collapse;font-size:.95rem">
              <tr><td style="padding:.6rem 0;border-bottom:1px solid #eee;color:#666;width:120px">Name</td><td style="padding:.6rem 0;border-bottom:1px solid #eee">${name}</td></tr>
              <tr><td style="padding:.6rem 0;border-bottom:1px solid #eee;color:#666">Email</td><td style="padding:.6rem 0;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:.6rem 0;border-bottom:1px solid #eee;color:#666">Phone</td><td style="padding:.6rem 0;border-bottom:1px solid #eee">${phone || '—'}</td></tr>
              <tr><td style="padding:.6rem 0;border-bottom:1px solid #eee;color:#666">Service</td><td style="padding:.6rem 0;border-bottom:1px solid #eee">${serviceLabels[service] || service}</td></tr>
            </table>
            <div style="margin-top:1.4rem">
              <p style="color:#666;font-size:.85rem;margin-bottom:.4rem">Message</p>
              <p style="line-height:1.7">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Brevo error:', err);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
