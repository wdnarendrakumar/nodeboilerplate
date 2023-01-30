const nodemailer = require('nodemailer');

const logger = require('../config/logger');

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
      user: 'wdnarendrakumar@gmail.com',
      pass: ''
  }
});

transport
  .verify()
  .then(() => logger.info('Connected to email server'))
  .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));

const sendEmail = async (to, subject, text) => {
  const msg = { from: 'wdnarendrakumar@gmail.com', to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://127.0.0.1:7000/v1/auth/resetPassword/${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://127.0.0.1:7000/v1/auth/resetPassword/${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
