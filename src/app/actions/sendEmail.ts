import nodemailer from "nodemailer";

const EMAIL_SENDER = process.env.EMAIL_SENDER;
const APP_BASE_URL = process.env.BASE_APP_URL;
const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;

export async function sendVerifyEmail(
  email: string,
  verToken: string,
  id: string
) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_SENDER,
      pass: EMAIL_APP_PASSWORD,
    },
  });

  var mailOptions = {
    from: EMAIL_SENDER,
    to: email,
    subject: "Connectify email verification",
    text: `${APP_BASE_URL}auth/verify?verifyToken=${verToken}&id=${id}`,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}
