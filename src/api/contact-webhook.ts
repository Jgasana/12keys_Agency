export interface ContactWebhookPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceName: string;
  subject: string;
  timestamp?: string;
}

const WEBHOOK_URL = 'https://12keys-agency-n8n.go13ce.easypanel.host/webhook/aaed8b10-6338-4a55-bc2f-96dd2e3d1e40';

export async function sendToWebhook(data: ContactWebhookPayload): Promise<void> {
  const payload = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  console.log('Sending to webhook:', payload);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed with status: ${response.status}`);
    }

    console.log('Webhook sent successfully');
  } catch (error) {
    console.error('Error sending to webhook:', error);
    throw error;
  }
}
