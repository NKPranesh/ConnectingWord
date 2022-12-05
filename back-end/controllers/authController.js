const User = require("../models/User");
const jwt = require("jsonwebtoken");

//handle errors
const handleErrors = (err) => {
  let errors = {
    email: "",
    password: "",
    name: "",
    latitude: "",
    longitude: "",
    ocuupation: "",
  };

  //unique email handle
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }

  //validate errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((obj) => {
      let properties = obj.properties;
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const createToken = (id) => {
  return jwt.sign({ id }, "philanterfakadi", {
    expiresIn: 1 * 24 * 60 * 60,
  });
};

singup_post = async (req, res) => {
  const { email, password, name, latitude, longitude, occupation } = req.body;
  const requests = [];
  const friends = [];
  const flag = 0;

  try {
    const user = await User.create({
      email,
      password,
      name,
      latitude,
      longitude,
      occupation,
      requests,
      friends,
      flag,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      domain: "connectingworld-api.cyclic.app",
      secure: true,
      sameSite: "none",
    });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      domain: "connectingworld-api.cyclic.app",
      //domain: "localhost",
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ user: user._id, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

logout_get = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1,
    domain: "connectingworld-api.cyclic.app",
    //domain: "localhost",
    secure: true,
    sameSite: "none",
  });
  res.json({ status: "logged out" });
};

module.exports = {
  singup_post: singup_post,
  login_post: login_post,
  logout_get: logout_get,
};
