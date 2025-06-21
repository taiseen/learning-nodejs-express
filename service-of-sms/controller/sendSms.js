import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountNumber = process.env.TWILIO_PHONE_NUMBER;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);


export const sendSms = async (req, res) => {

    const { to, message } = req.body;

    if (!to || !message) {
        return res.status(400)
            .json({ message: 'To and message fields are required 🔴' });
    }

    try {

        const result = await client.messages.create({
            body: message,
            from: accountNumber, // Your Twilio phone number
            to: to // The recipient's phone number
        });

        res.status(200)
            .json({ message: 'SMS send ✅', sid: result.sid });

    } catch (error) {
        res.status(500)
            .json({ message: 'Failed to send SMS 🔴', error: error.message });
    }
}
