const express = require('express');
const ChestContent = require('../models/ChestContent');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/chest-contents', [auth, admin], async (req, res) => {
  try {
    const chestContents = await ChestContent.find();
    res.json(chestContents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/chest-contents', [auth, admin], async (req, res) => {
  try {
    const { text, link } = req.body;
    const newContent = new ChestContent({ text, link });
    await newContent.save();
    res.json(newContent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;