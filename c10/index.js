const express = require("express");
const { getSection } = require("./pkg/config");
const { sendWelcomeMail, sendPasswordResetMail } = require("./handlers/mailer");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/api/send-mail", sendWelcomeMail);
app.post("/api/reset-pass", sendWelcomeMail);

// server startup
app.listen(getSection("development").port, () => {
  console.log(`Server started at port ${getSection("development").port}`);
});
