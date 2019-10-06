const sgMail = require("@sendgrid/mail");
const sgApiKey =
  "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";

sgMail.setApiKey(sgApiKey);

const sendWelcomeMail = (name, email) => {
  const msg = {
    to: email,
    from: "hamzafaiaal1@gmail.com",
    subject: "Thanks For Joining Our Site " + name,
    html: `<h1>You create an account with ${email}...</h1>`
  };
  sgMail.send(msg);
};

const setDeleteAccountMail = email => {
  const msg = {
    to: email,
    from: "hamzafaiaal1@gmail.com",
    subject: "Your Account Is Removed Successfully",
    html: `<h3>Please help us with your feedback to improve ourselves</h3>`
  };
  sgMail.send(msg);
};

module.exports = {
  sendWelcomeMail,
  setDeleteAccountMail
};
