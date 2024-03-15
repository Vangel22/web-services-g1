const mailer = require("../pkg/mailer");

const sendMessage = async () => {
  try {
    mailer.sendMessage();
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const sendWelcomeMail = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const sendPasswordResetMail = () => {};

module.exports = {
  sendMessage,
  sendWelcomeMail,
  sendPasswordResetMail,
};
