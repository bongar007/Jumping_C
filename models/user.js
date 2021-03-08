const mongoose = require("mongoose");
const randtoken = require("rand-token");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  highScore: { type: Number },
  token: {
    type: Schema.Types.ObjectId,
    ref: "Token",
    default: null,
  },
});

const TokenSchema = new mongoose.Schema({
  value: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  expireAt: {
    type: Date,
    expires: 60,
    default: Date.now,
  },
});

UserSchema.methods.generateToken = function () {
  const token = new Token();
  token.value = randtoken.generate(32);
  token.user = this._id;
  this.token = token._id;
  // this.save(function (err) {
  //   if (err) throw err;
  //   token.save(function (err) {
  //     if (err) throw err;
  //   });
  // });
};

const User = mongoose.model("User", UserSchema); ///UPPER CASE EXPORT!!!!!!
// const Token = mongoose.model("Token", TokenSchema);
// const Models = { User: User, Token: Token };
module.exports = User;
