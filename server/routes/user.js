const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/add-funds', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const lastTopUp = user.lastTopUp ? new Date(user.lastTopUp) : new Date(0);
    const now = new Date();
    const timeDiff = now - lastTopUp;

    if (timeDiff < 60 * 60 * 1000) {
      return res.status(400).json({ msg: 'You can only add funds once per hour' });
    }

    user.balance += amount;
    user.lastTopUp = now;
    await user.save();

    res.json({ balance: user.balance });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;