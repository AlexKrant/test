const axios = require('axios');
const crypto = require('crypto');

const createPayment = async (amount, currency) => {
  try {
    const response = await axios.post('https://api.nowpayments.io/v1/payment', {
      price_amount: amount,
      price_currency: currency,
      pay_currency: 'btc', // или любая другая поддерживаемая криптовалюта
      ipn_callback_url: 'https://your-website.com/api/payments/callback', // Замените на реальный URL вашего сервера
      order_id: Date.now().toString(), // уникальный идентификатор заказа
    }, {
      headers: {
        'x-api-key': process.env.NOWPAYMENTS_API_KEY,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Payment creation error:', error);
    throw error;
  }
};

const verifyIpnSignature = (payload, signature) => {
  const sortedPayload = Object.keys(payload)
    .sort()
    .reduce((acc, key) => {
      acc[key] = payload[key];
      return acc;
    }, {});

  const stringifiedPayload = JSON.stringify(sortedPayload);
  const hmac = crypto.createHmac('sha512', process.env.NOWPAYMENTS_IPN_SECRET);
  const calculatedSignature = hmac.update(stringifiedPayload).digest('hex');

  return calculatedSignature === signature;
};

module.exports = { createPayment, verifyIpnSignature };
