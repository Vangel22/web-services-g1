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
    key: getSection("development").api_key || "",
  });

  //   console.log("mg", mg);

  const test = mg.messages.create("", {
    from: "your@gmail.com",
    to: "your@gmail.com",
    // to: ["test@mail.com", "testtwo@mail.com"]
    subject: "Hello World",
    text: "Testing Mailgun",
    //   html: "<h1>Testing HTML</h1>",
  });

  return test;
};

module.exports = {
  sendMessage,
};
