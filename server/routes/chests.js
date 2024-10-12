const express = require('express');
const User = require('../models/User');
const ChestContent = require('../models/ChestContent');
const auth = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

router.post('/open', auth, async (req, res) => {
  try {
    const { chestType } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.balance < 1) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }

    user.balance -= 1;
    await user.save();

    const chestContents = await ChestContent.find();
    const randomContent = chestContents[Math.floor(Math.random() * chestContents.length)];

    // Send email notification
    await sendEmail(user.email, 'Chest Opened', `You opened a ${chestType} chest and received: ${randomContent.text}`);

    res.json({ text: randomContent.text, link: randomContent.link });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;