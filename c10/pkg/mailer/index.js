const fs = require("fs");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

// Mailgun = {
// create: () => {}
// }
// const mailgun = {
//  client: () => {}
// }

//const mg = {
// messages: {
// create: () => {}
// }
// }
const mailgun = new Mailgun(formData);

const { getSection } = require("../config");

const sendMessage = () => {
  const mg = mailgun.client({
    username: "api",
    key:
      getSection("development").api_key ||
      "key-08845b24f1f301c0858e3817a184507e",
  });

  //   console.log("mg", mg);

  const test = mg.messages.create(
    "sandbox6a27711605204b26a87436754162784d.mailgun.org",
    {
      from: "h.vangel22@gmail.com",
      to: "h.vangel22@gmail.com",
      // to: ["test@mail.com", "testtwo@mail.com"]
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
