import { NextApiRequest, NextApiResponse } from 'next';
const nodemailer = require('nodemailer');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: process.env.EMAIL_RECEIVER_ADDRESS,
      subject: subject,
      text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
