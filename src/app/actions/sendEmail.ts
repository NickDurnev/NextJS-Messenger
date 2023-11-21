import sgMail from "@sendgrid/mail";

const EMAIL_SENDER = process.env.EMAIL_SENDER;
const APP_BASE_URL = process.env.APP_BASE_URL;
const TEMPLATE_ID = process.env.TEMPLATE_ID;

const sendVerifyEmail = async (email: string, verToken: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");
  const msg = {
    to: `${email}`, // Change to your recipient
    from: `${EMAIL_SENDER}`, // Change to your verified sender
    templateId: `${TEMPLATE_ID}`, //TEMPLATE_ID,
    dynamic_template_data: {
      subject: "Connectify email verification",
      preheader: "Verify your Connectify account",
      link: `${APP_BASE_URL}auth/${verToken}`,
    },
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

export default sendVerifyEmail;
