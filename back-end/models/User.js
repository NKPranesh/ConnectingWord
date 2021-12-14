const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [5, "Minimum password length is 5 characters"],
  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minlength: [4, "Name should have atleast 4 characters"],
  },
  latitude: {
    type: Number,
    required: [true, "Please enter your latitude"],
  },
  longitude: {
    type: Number,
    required: [true, "Please enter a longitude"],
  },
  occupation: {
    type: String,
    required: [true, "Please enter your occupation"],
    minlength: [3, "Occupation should have atleast 3 characters"],
  },
  requests: {
    type: Array,
    required: true,
  },
  friends: {
    type: Array,
    required: true,
  },
  flag: {
    type: Number,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.flag == 0) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.flag = 1;
  }
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
