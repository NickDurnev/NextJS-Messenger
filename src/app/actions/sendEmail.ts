import sgMail from "@sendgrid/mail";

const EMAIL_SENDER = process.env.EMAIL_SENDER;
const APP_BASE_URL = process.env.APP_BASE_URL;

const sendVerifyEmail = async (email: string, verToken: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");
  const msg = {
    to: `${email}`, // Change to your recipient
    from: `${EMAIL_SENDER}`, // Change to your verified sender
    templateId: "d-9ce58db3f70f4dd5832e7dd6d75f28c6",
    dynamic_template_data: {
      subject: "Phonebook email verification",
      text: `Verify your email to join our family 🤗`,
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
