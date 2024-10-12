const express = require('express');
const { createPayment, verifyIpnSignature } = require('../utils/paymentGateway');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.post('/create', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const payment = await createPayment(amount, 'USD');
    res.json({
      paymentUrl: payment.invoice_url,
      paymentId: payment.payment_id
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/callback', async (req, res) => {
  const signature = req.headers['x-nowpayments-sig'];
  
  if (!signature || !verifyIpnSignature(req.body, signature)) {
    return res.status(400).send('Invalid signature');
  }

  const { payment_status, pay_address, price_amount, price_currency, order_id } = req.body;

  if (payment_status === 'finished') {
    try {
      // Здесь вы должны обновить баланс пользователя
      // Предполагается, что order_id содержит ID пользователя
      const user = await User.findById(order_id);
      if (user) {
        user.balance += parseFloat(price_amount);
        await user.save();
      }
    } catch (error) {
      console.error('Error updating user balance:', error);
    }
  }

  res.status(200).send('OK');
});

module.exports = router;
