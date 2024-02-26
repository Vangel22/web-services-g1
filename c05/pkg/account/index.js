const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  email: String,
  password: String,
  fullName: String,
});

const Account = mongoose.model("Account", accountSchema, "accounts");

// create an account - POST
const create = async () => {};

// get a user by id - GET
const getById = async () => {};

// get user by email - GET
const getByEmail = async () => {};

// set new password - PUT
const setNewPassword = async () => {};

// get all accounts - GET
const getAll = async () => {};

// update a user - PUT
const update = async () => {};

// delete a user - DELETE
const remove = async () => {};

module.exports = {
  create,
  getById,
  getByEmail,
  setNewPassword,
  getAll,
  update,
  remove,
};
