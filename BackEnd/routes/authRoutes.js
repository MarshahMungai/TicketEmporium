import express from 'express';
import { validateRequest, signupSchema } from '../middlewares/validateRequest.js';

import { signup, login, verifyEmail, changePassword, deactivateAccount, reactivateAccount, forgotPassword, verifyPasswordResetToken, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);

router.post('/signup', validateRequest(signupSchema), signup);

router.get('/verify-email/:token', verifyEmail);

router.post('/change-password', changePassword);

router.patch('/deactivate-account', deactivateAccount);

router.patch('/reactivate-account', reactivateAccount);

router.patch('/forgot-password', forgotPassword);

router.get('/verify-password-reset-token/:token', verifyPasswordResetToken);

router.patch('/reset-password', resetPassword);


export default router;
