const mongoose = require("mongoose");
const UsersSchema = mongoose.Schema({
  results: Array,
});
//madhuri
const UserModel = mongoose.model("user", UsersSchema);
module.exports = {
  UserModel,
};
