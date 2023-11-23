"use strict";
const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.email,
    pass: process.env.email_password,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.from_email, // sender address
    to: process.env.to_email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello!", // plain text body
    html: "<b>Hello!</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
