const express = require('express');
const router = express.Router();
const twilio = require('twilio');

router.post('/', async (req, res) => {
    try {
        // Extract message details from the request body
        const { from, to, body } = req.body;

        // Initialize Twilio client with your API credentials
        const client = twilio('', '');

        // Send the message
        const message = await client.messages.create({
            body: body,
            from: from,
            to: to
        });

        // Respond with success message
        res.json({ success: true, message: 'Message sent successfully', messageSid: message.sid });
    } catch (error) {
        // Handle errors
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, error: 'Failed to send message' });
    }
});

module.exports = router;
