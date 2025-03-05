const API_KEY = 'D6T71ZG-HCKM5XG-QWRG7DJ-WK9X33V';
const PUBLIC_KEY = 'c392d250-4a3d-460e-a46b-52a059a08b5c';
const IPN_SECRET_KEY = 'Df2i5V0xX1BDJ6dxRQ2gIFS/9X/QBfml';
const TELEGRAM_BOT_TOKEN = "7590766158:AAFTMfMpGQkg_4iw3UyOiGX4NdarPIvcwRE";
const TELEGRAM_CHAT_ID = "6807445600";

// This function will be called once payment is made
function sendToTelegram(paymentDetails) {
    const message = `
        New Payment Received:
        Product: ${paymentDetails.productName}
        Price: $${paymentDetails.amount}
        Email: ${paymentDetails.email}
    `;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    fetch(telegramUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        })
    });
}

// Webhook API to handle payment processing
fetch('https://payment-processing-url.com/api/v1/verify', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'API_KEY': API_KEY,
        'PUBLIC_KEY': PUBLIC_KEY,
    },
    body: JSON.stringify({
        cardNumber: 'exampleCardNumber',
        expiryDate: '12-2025',
        cvc: '123',
        email: 'customer@example.com'
    })
}).then(response => response.json())
  .then(data => {
      if (data.status === 'success') {
          // Send data to Telegram if payment is successful
          sendToTelegram({
              productName: 'Product Name',
              amount: '50',
              email: 'customer@example.com'
          });
      }
  });
