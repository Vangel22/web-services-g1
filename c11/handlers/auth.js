const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../pkg/config");
const account = require("../pkg/account");
const { validate, Account, AccountLogin } = require("../pkg/account/validate");
const { sendMail } = require("../pkg/mailer");

//login, register, refreshToken, forgotPassword, resetPassword

const login = async (req, res) => {
  try {
    await validate(req.body, AccountLogin);
    const acc = await account.getByEmail(req.body.email);
    if (!acc) {
      throw {
        code: 400,
        error: "Acount not found!",
      };
    }

    if (!bcrypt.compareSync(req.body.password, acc.password)) {
      throw {
        code: 400,
        error: "Wrong password!",
      };
    }
    const payload = {
      full_name: acc.full_name,
      email: acc.email,
      id: acc._id,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
    };
    const token = jwt.sign(payload, config.getSection("development").jwt_key);
    return res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    return res.status(err.code).send(err.error);
  }
};

const register = async (req, res) => {
  try {
    await validate(req.body, Account);
    const exists = await account.getByEmail(req.body.email);
    if (exists) {
      throw {
        code: 400,
        error: "Account exists!",
      };
    }
    req.body.password = bcrypt.hashSync(req.body.password);
    const acc = await account.create(req.body);
    return res.status(201).send(acc);
  } catch (err) {
    console.log(err);
    return res.status(err.code).send(err.error);
  }
};

const refreshToken = async (req, res) => {
  const payload = {
    ...req.auth,
    exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
  };
  const token = jwt.sign(payload, config.getSection("development").jwt_key);
  return res.send({ token });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await account.getByEmail(email);

  if (!user) {
    return res.status(400).send("User not registered!");
  }

  // header, payload, signature

  const secret = config.getSection("development").jwt_key + user.password;
  const payload = {
    email: user.email,
    id: user.id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "15m" });
  // /reset-password/:id/:token
  const link = `http://localhost:10000/reset-password/${user.id}/${token}`;
  console.log("link", link);

  try {
    await sendMail(user.email, "PASSWORD_RESET", { user, link });
    return res
      .status(200)
      .send("Password reset link has been sent to your email...");
  } catch (err) {
    return res.status(500).send("Message not sent!");
  }
};

// View -> GET request
const resetPassTemplate = async (req, res) => {
  // `http://localhost:10000/reset-password/${user.id}/${token}`;
  const { id, token } = req.params;

  const user = await account.getById(id);

  if (!user) {
    return res.status(400).send("User not registered!");
  }

  const secret = config.getSection("development").jwt_key + user.password;

  try {
    const payload = jwt.verify(token, secret);
    if (!payload) {
      res.send("Token not valid!");
    }
    res.render("reset-password", { email: user.email });
  } catch (err) {
    return res.status(500).send("Message not sent!");
  }
};

// POST request
const resetPassword = async (req, res) => {
  // `http://localhost:10000/reset-password/${user.id}/${token}`;
  // http://localhost:10000/reset-password/65df92c9c03b58dc90ee9a4e/
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAc2Vtb3MuY29tIiwiaWQiOiI2NWRmOTJjOWMwM2I1OGRjOTBlZTlhNGUiLCJpYXQiOjE3MTA1MzUxNjAsImV4cCI6MTcxMDUzNjA2MH0.wS4ZDavxlB9yhOC5Efm_-yHOM74hupsw4Ps9vFpvIAw
  const { id, token } = req.params;
  const { password, confirmPass } = req.body;

  if (password !== confirmPass) {
    return res.status(400).send("Passwords do not match!");
  }

  const hashedPass = bcrypt.hashSync(password);

  const user = await account.getById(id);

  if (!user) {
    return res.status(400).send("User not registered!");
  }

  const secret = config.getSection("development").jwt_key + user.password;

  try {
    const payload = jwt.verify(token, secret);
    if (!payload) {
      res.send("Token not valid!");
    }

    await account.setNewPassword(user.id, hashedPass);
    res.status(200).send("Password reset successful!");
  } catch (err) {
    return res.status(500).send("Message not sent!");
  }
};

module.exports = {
  login,
  register,
  refreshToken,
  forgotPassword,
  resetPassword,
  resetPassTemplate,
};
