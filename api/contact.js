const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed.' });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email and message are required.' });
    }

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            await transporter.sendMail({
                from: `${name} <${email}>`,
                to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
                subject: `Portfolio contact from ${name}`,
                text: message,
                html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`
            });
        } catch (error) {
            console.error('Email send failed:', error);
            return res.status(500).json({ error: 'Failed to send message.' });
        }
    }

    return res.status(200).json({
        success: true,
        message: 'Message received. I will get back to you soon.'
    });
};
