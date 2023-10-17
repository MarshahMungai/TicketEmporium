import nodemailer from 'nodemailer';
// import dotenv from 'dotenv'; // Import dotenv to load environment variables

// dotenv.config(); // Load environment variables from .env file


// Function to send a verification email
const sendVerificationEmail = (user, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'ticketemporium01@gmail.com', 
      pass: 'vzaq haqk jdwa vyqp', 
    },
  });

  const mailOptions = {
    from: "ticketemporium01@gmail.com", 
    to: user.email,
    subject: "Verification Email",
    html: `Hey ${user.firstName} 😎,<br><br>
    Welcome to Ticket Emporium! We're excited to have you on board.<br><br>
    Your account has been successfully registered, and you're now part of our community of event enthusiasts.<br><br>
    To start exploring and purchasing tickets for your favorite events, simply click the button below to complete your verification and log in:<br><br>
    <a href="http://localhost:8080/verify-email/${user.token}" style="display: inline-block; padding: 12px 24px; background-color: #007BFF; color: #FFFFFF; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify</a><br><br>
    If you have any questions or need assistance, feel free to contact us. We're here to help!<br><br>
    Enjoy your Ticket Emporium experience.<br><br>
    Regards,<br>
    Ticket Emporium Support Team`,

  };

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.log("There was an error sending the email", err);
      res.status(500).json("Email sending failed");
    } else {
      console.log("Email sent successfully", response);
      res.status(200).json("Verification email sent");
    }
  });
};


// Function to send a forget password email
const sendForgotPasswordEmail = (user, res) => {
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'ticketemporium01@gmail.com', 
      pass: 'vzaq haqk jdwa vyqp',  
    },
});

const mailOptions = {
    from: "ticketemporium01@gmail.com",
    to: user.email,
    subject: "Forgot Your Password?",
    html: `Hey ${user.firstName}, <br>
    You are receiving this email because someone (hopefully you 🤨), requested<br>
    assistance with resetting your account password. If you did not request this, please<br>
    ignore this email. If you did make this request, please click the button below to reset<br>
    your password:<br><br>
    <a href="http://localhost:8080/forgot-password/${user.token}" style="display: inline-block; padding: 12px 24px; background-color: #007BFF; color: #FFFFFF; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a><br><br>
    If you have any questions or need assistance, feel free to contact us. We're here to help!<br><br>
    Regards,<br>
    Ticket Emporium Support Team`,
};

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.log("There was an error sending the email", err);
      res.status(500).json("Email sending failed");
    } else {
      console.log("Email sent successfully", response);
      res.status(200).json("Forget password email sent");
    }
  });
};


const sendTicket = async (user, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'ticketemporium01@gmail.com', 
      pass: 'vzaq haqk jdwa vyqp', 
    },
  });

    const mailOptions = {
      from: "ticketemporium01@gmail.com", 
      to: user.email,
      subject: "Ticket Purchase Confirmation",
      html: `Hey ${user.firstName} ,<br><br>
      You're headed to ${user.eventName} at ${user.venue}! 😎 Please present this email at the entrance for verification.<br><br>
      <b>Event Details:</b><br>
      Ticket Holder: ${user.firstName} ${user.lastName}<br>
      Event Name: ${user.eventName}<br>
      Venue: ${user.venue}<br>
      Ticket Type: General Admission<br>
      Ticket Price: ${user.price}<br><br>
      
      If you have any questions or need assistance, feel free to contact us. We're here to help!<br><br>
      Regards,<br>
      Ticket Emporium Support Team`,

    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.log("There was an error sending the email", err);
        res.status(500).json("Email sending failed");
      } else {
        console.log("Email sent successfully", response);
        res.status(200).json("Ticket email sent");
      }
    });
};

const sendHelpResponse = async (user, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'ticketemporium01@gmail.com', 
      pass: 'vzaq haqk jdwa vyqp', 
    },
  });

    const mailOptions = {
      from: "ticketemporium01@gmail.com", 
      to: user.email,
      subject: "Response to your Question",
      html: `Hey there ,<br><br>
      You recently needed help on our website.This is the response to your question<br><br>
      <b>${user.response}</b><br><br>
      If you have any other questions or need assistance, feel free to contact us. We're here to help!<br><br>
      Regards,<br>
      Ticket Emporium Support Team`,

    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.log("There was an error sending the email", err);
        res.status(500).json("Email sending failed");
      } else {
        console.log("Email sent successfully", response);
        res.status(200).json("response email sent");
      }
    });
};

export {
  sendVerificationEmail,
  sendForgotPasswordEmail,
  sendTicket,
  sendHelpResponse
};