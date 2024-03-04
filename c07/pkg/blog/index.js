const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Account",
  },
  title: String,
  content: String,
});

const Posts = mongoose.model("Post", postSchema, "posts");

const getAll = async () => {};

const getAllAlphabetically = async () => {};

const create = async () => {};

const update = async () => {};

const remove = async () => {};

module.exports = {
  getAll,
  getAllAlphabetically,
  create,
  update,
  remove,
};
