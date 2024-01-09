import nodemailer from "nodemailer";
import createEmail from "./createEmail";

const EMAIL_SENDER = process.env.EMAIL_SENDER;
const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;
const APP_BASE_URL = process.env.NEXT_PUBLIC_BASE_APP_URL;

export async function sendVerifyEmail(
  email: string,
  verToken: string,
  id: string,
  name: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_SENDER,
      pass: EMAIL_APP_PASSWORD,
    },
  });

  // Define the data to be passed to the template
  const templateData = {
    link: `${APP_BASE_URL}auth/verify?verifyToken=${verToken}&id=${id}`,
    name,
  };

  const html = createEmail(templateData, "/templates/verifyEmail.hbs");

  console.log(html);

  const mailOptions = {
    from: EMAIL_SENDER,
    to: email,
    subject: "Connectify email verification",
    html: html,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}
