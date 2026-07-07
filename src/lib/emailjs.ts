import emailjs from '@emailjs/browser';

export const sendNotificationEmail = async (data: any) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'namaste@vishweshwarasanskrit.com';

  if (!serviceId || !templateId || !publicKey) {
    console.warn('EmailJS environment variables are missing. Skipping email notification.');
    return;
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: adminEmail,
        from_name: data.name || 'Unknown',
        from_email: data.email || 'No email provided',
        phone: data.phone || 'N/A',
        subject: data.subject || 'New Inquiry',
        timezone: data.timezone || 'Unknown',
        background: data.background || 'N/A',
        message: data.message || 'No message provided'
      },
      publicKey
    );
  } catch (error) {
    console.error('Failed to send email via EmailJS', error);
  }
};
