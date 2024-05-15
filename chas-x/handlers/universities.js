const { sendMessage } = require("../pkg/mailer");

const sendWelcomeMail = async (req, res) => {
  try {
    sendMessage();
    return res.send("Return");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const sendPasswordResetMail = () => {};

module.exports = {
  sendWelcomeMail,
  sendPasswordResetMail,
};
