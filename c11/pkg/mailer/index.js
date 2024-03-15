const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const { getSection } = require("../config");

const mailTemplates = {
  PASSWORD_RESET: {
    title: "Your password reset link has been generated",
    template: "reset_password.html",
  },
  WELCOME: {
    title: "Welcome to our website",
    template: "welcome.html",
  },
};

const sendMessage = () => {
  const mg = mailgun.client({
    username: "api",
    key: getSection("development").api_key
      ? getSection("development").api_key
      : "b3df77b576a58da88f45dba065067c10-b02bcf9f-7f5cfd4f",
  });

  // const domain = getSection("development").domain;

  const test = mg.messages.create(
    "sandbox99d2fba2d5ea4bbeb45385f9371bef91.mailgun.org",
    {
      from: "h.vangel22@gmail.com",
      to: "h.vangel22@gmail.com",
      subject: "Hello World",
      text: "Testing Mailgun",
      //   html: "<h1>Testing HTML</h1>",
    }
  );

  return test;
};

module.exports = {
  sendMessage,
};
