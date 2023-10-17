import express from 'express';
import { sendVerificationEmail, sendForgotPasswordEmail, sendTicket, sendHelpResponse } from "../controllers/emailController.js"; // Import the emailController

const router = express.Router();


// POST route for sending a verification email
router.post("/sendVerificationEmail", (req, res) => {
  // Extract user data from the request body
  const { firstName, email, token } = req.body;

  // Create a user object
  const user = {
    firstName,
    email,
    token,
  };

  // Use the user object to send the verification email
  sendVerificationEmail(user, res);
});


// POST route for sending a verification email
router.post("/sendforgotPasswordEmail", (req, res) => {
  // Extract user data from the request body
  const { firstName, email, token } = req.body;

  // Create a user object
  const user = {
    firstName,
    email,
    token,
  };

  // Use the extracted email to send a forget password email
  sendForgotPasswordEmail(user, res);
});



router.post("/sendTicket", (req, res) => {

  const { firstName, email, eventName, venue, price, lastName } = req.body;

  const user = {
    firstName,
    lastName,
    email,
    eventName,
    venue,
    price,
  };

  sendTicket(user, res);
});

router.post("/sendResponse", (req, res) => {

  const { email, response } = req.body;

  const user = {
    
    email,
    response
  };

  sendHelpResponse(user, res);
});




export default router;
