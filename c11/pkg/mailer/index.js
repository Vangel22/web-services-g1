const fs = require("fs");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const config = require("../config");

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

const sendMail = async (to, type, data) => {
  //to -> to whom the mail is sent => h.vangel22@gmail.com
  //type -> it will refer to the template => PASSWORD_RESET ili WELCOME
  //data -> data sent from the user => { user, link } koj doagja od forgotPassword

  console.log("to", to, type, data);
  const mg = mailgun.client({
    username: "api",
    key:
      config.getSection("development").api_key ||
      "b3df77b576a58da88f45dba065067c10-b02bcf9f-7f5cfd4f",
  });

  let title = mailTemplates[type].title;
  let templatePath = `${__dirname}/../../email_templates/${mailTemplates[type].template}`;
  // __dirname = /Users/vangelhristov/semos-education/web-services-g1/c11/pkg/mailer
  let content = await readTemplate(templatePath);

  // ova doagja od forgot password handlerot
  const { user, link } = data;
  const userfullname = user.fullname.split(" ");
  const firstName = userfullname[0]; // Vangel
  const lastName = userfullname[1]; // Hristov

  let regexName = new RegExp(`\{\{first_name\}\}`, "g");
  let regexSurname = new RegExp(`\{\{last_name\}\}`, "g");
  let regexLink = new RegExp(`\{\{link\}\}`, "g");
  content = content.replace(regexName, firstName); // {{first_name}} => Vangel
  content = content.replace(regexSurname, lastName); // {{last_name}} => Hristov
  content = content.replace(regexLink, link); // {{link}} =>
  // http://localhost:10000/reset-password/65df92c9c03b58dc90ee9a4e/
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAc2Vtb3MuY29tIiwiaWQiOiI2NWRmOTJjOWMwM2I1OGRjOTBlZTlhNGUiLCJpYXQiOjE3MTA1MzUxNjAsImV4cCI6MTcxMDUzNjA2MH0.wS4ZDavxlB9yhOC5Efm_-yHOM74hupsw4Ps9vFpvIAw

  let options = {
    from: config.getSection("development").sender_email,
    to: to,
    subject: title,
    html: content, // ke se zema od reset_password.html
  };

  try {
    const res = await mg.messages.create(
      config.getSection("development").domain,
      options
    );
    // mg.messages.create("sandbox.mailgun.domain", {
    //   from: "test@gmail.com",
    //   to: "vasiot mejl za da gi vidite rezultatite",
    //   subject: "So sakate da ima kako naslov",
    //   text: "Tekst vo mejlot" ili pak
    //   html: content, -> ili pak HTML
    // })
    console.log("res", res);
    return res;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

const readTemplate = async (file) => {
  return new Promise((success, fail) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) return fail(err);
      return success(data);
    });
  });
};

module.exports = {
  sendMail,
};
