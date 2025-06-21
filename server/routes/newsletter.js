import express from 'express';
import Subscriber from '../models/Subscriber.js';

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const existing = await Subscriber.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'You are already subscribed' });

    await Subscriber.create({ email });
    res.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
