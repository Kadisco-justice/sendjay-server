// server.js - Send Jay Logistics Payment Server
const express = require('express');
const app = express();
const PORT = 3000;

// Teach server to read JSON
app.use(express.json());

// Webhook for Flutterwave payments
app.post('/webhooks/flutterwave', (req, res) => {
  console.log('🎯 FLUTTERWAVE PAYMENT RECEIVED!');
  console.log('Payment details:', req.body);
  
  // Always say "I got it!" to Flutterwave quickly
  res.status(200).json({ 
    status: 'success', 
    message: 'Payment received successfully!',
    server: 'Send Jay Logistics',
    timestamp: new Date().toISOString()
  });
  
  // Show payment details in console
  if (req.body.event === 'charge.completed') {
    const payment = req.body.data;
    console.log('💰 PAYMENT SUCCESS!');
    console.log('📦 Order Reference:', payment.tx_ref);
    console.log('💵 Amount:', payment.amount, payment.currency);
    console.log('👤 Customer:', payment.customer?.email);
    console.log('🆔 Transaction ID:', payment.id);
  }
});

// Test if server is working
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Send Jay Logistics Server is RUNNING!',
    status: 'ready_for_payments',
    webhook_available: true,
    server_time: new Date().toISOString(),
    instructions: 'Go to /webhooks/flutterwave for payment webhooks'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log('');
  console.log('=================================================');
  console.log('🎉 🎉 🎉 SERVER STARTED SUCCESSFULLY! 🎉 🎉 🎉');
  console.log('=================================================');
  console.log('📍 Your server is running at: http://localhost:' + PORT);
  console.log('🔗 Webhook URL: http://localhost:' + PORT + '/webhooks/flutterwave');
  console.log('');
  console.log('💡 TO TEST YOUR SERVER:');
  console.log('   1. Open your web browser');
  console.log('   2. Go to: http://localhost:' + PORT);
  console.log('   3. You should see a success message!');
  console.log('');
  console.log('📞 Ready to receive payments from Flutterwave!');
  console.log('=================================================');
  console.log('');
});