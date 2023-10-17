const User = require('../models/User');

const checkAuthentication = async (req, res, next) => {
    const {email, password} = req.body;
    // Check if the email and password are present in the request body
    if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
    }
    try {
    // Query the database to find a user with the provided email and password
    await User.findOne({ email: email, password:password }, (err, result) => {
        console.log(result);
        // If the user is not found, return an error response
        if (result.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
        }
        // If the user is found, attach the user object to the request object and call the next middleware function
        req.user = result;
        next();
    });
    } catch (err) {
    // If an error occurs, return a server error response
    console.error(err);
    res.status(500).json({ message: "Server error" });
    }
    };

    module.exports = checkAuthentication;
    