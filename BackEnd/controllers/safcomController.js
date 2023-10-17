// import axios from 'axios';

// // Controller function to initiate STK push
// const initiateSTKPush = async (req, res) => {
//   try {
//     const { phoneNumber, amount } = req.body;

//     // Use your Daraja API credentials
//     const consumerKey = 'YOUR_CONSUMER_KEY';
//     const consumerSecret = 'YOUR_CONSUMER_SECRET';

//     // Construct the authentication token
//     const auth = `Basic ${Buffer.from(consumerKey + ':' + consumerSecret).toString('base64')}`;

//     // Construct the request payload
//     const payload = {
//       BusinessShortCode: 'YOUR_BUSINESS_SHORT_CODE',
//       Password: 'GENERATED_PASSWORD', // See Daraja documentation for password generation
//       Timestamp: 'GENERATED_TIMESTAMP', // Use the current timestamp
//       TransactionType: 'CustomerPayBillOnline',
//       Amount: amount,
//       PartyA: phoneNumber,
//       PartyB: 'YOUR_PAYBILL_NUMBER',
//       PhoneNumber: phoneNumber,
//       CallBackURL: 'YOUR_CALLBACK_URL',
//       AccountReference: 'YOUR_ACCOUNT_REFERENCE',
//       TransactionDesc: 'Payment description',
//     };

//     // Make an HTTP POST request to Safaricom's Daraja API to initiate the STK push
//     const response = await axios.post(
//       'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
//       payload,
//       {
//         headers: {
//           Authorization: auth,
//         },
//       }
//     );

//     // Handle the response and send it to your Vue frontend
//     res.json(response.data);
//   } catch (error) {
//     // Handle any errors
//     res.status(500).json({ error: 'An error occurred while initiating the STK push' });
//   }
// };



// export { initiateSTKPush };

