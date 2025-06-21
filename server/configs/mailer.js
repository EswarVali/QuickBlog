import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,       // your gmail
    pass: process.env.EMAIL_PASSWORD,   // app password (not your real password)
  },
});

export default transporter;
