const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { create, getByEmail } = require("../pkg/account");
const {
  validate,
  AccountLogin,
  AccountRegister,
} = require("../pkg/account/validate");
const { getSection } = require("../pkg/config");

//login, register, refreshToken, forgotPassword, resetPassword

const login = async (req, res) => {
  try {
    await validate(req.body, AccountLogin);
    const { email, password } = req.body;
    const account = await getByEmail(email);
    if (!account) {
      return res.status(400).send("Account not found!");
    }
    // +1 failed login attempt
    if (!bcrypt.compareSync(password, account.password)) {
      // await registerFailedLogin();
      return res.status(400).send("Wrong password!");
    }

    // Payload
    // Dosegasnoto vreme od 1 januari 1970 vo sekundi -> new Date().getTime() / 1000
    const payload = {
      fullName: account.fullName,
      email: account.email,
      id: account._id,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60, // 7 dena vo idnina
    };

    const token = jwt.sign(payload, getSection("development").jwt_secret);
    // if (token) {
    //+ 1 success
    // await registerSuccessLogin();
    // }

    // JWT token delovi
    // xxxxx.yyyyy.zzzzz
    // header.payload.signature

    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    //eyJmdWxsTmFtZSI6IlZhbmdlbCBIcmlzdG92IiwiZW1haWwiOiJoLnZhbmdlbDIyQGdtYWlsLmNvbSIsImlkIjoiNjVkY2Y5ZmQ0NWU0OTkzNTljYTk0NGM4IiwiZXhwIjoxNzA5NTg1NTk5LjE3NywiaWF0IjoxNzA4OTgwNzk5fQ.
    //_k702sS14ix0D1Em9cn2iNDIx7KkO1u9YsKVk5OSE14

    return res.status(200).send({ token });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const register = async (req, res) => {
  try {
    await validate(req.body, AccountRegister);
    const exists = await getByEmail(req.body.email);
    if (exists) {
      throw {
        code: 400,
        error: "Account with this email already exists!",
      };
    }
    req.body.password = bcrypt.hashSync(req.body.password);
    const acc = await create(req.body);
    return res.status(201).send(acc);
  } catch (err) {
    console.log(err);
    return res.status(err.status).send(err.error);
  }
};

const resetPassword = async () => {};

const forgotPassword = async () => {};

const refreshToken = async () => {};

module.exports = {
  login,
  register,
  resetPassword,
  forgotPassword,
  refreshToken,
};
