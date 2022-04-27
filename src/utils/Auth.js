const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { SECRET } = require("../config/index");
const { use } = require("passport/lib");

const userRegister = async (userDetails, role, res) => {
  try {
    let usernameNotTaken = await validateUsername(userDetails.username);
    if (!usernameNotTaken) {
      return res.status(400).send({
        message: "username already taken",
        success: false,
      });
    }

    let emailNotRegistered = await validateEmail(userDetails.email);

    if (!emailNotRegistered) {
      return res.status(400).send({
        message: `Email is already registered.`,
        success: false,
      });
    }

    const password = await bcrypt.hash(userDetails.password, 12);

    const newUser = new User({
      ...userDetails,
      password,
      role,
    });
    await newUser.save();

    return res.status(201).json({
      message: "you have succesfully registered",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: " something went wrong unable to create account",
      success: false,
    });
  }
};

const userLogin = async (userDetails, role, res) => {
  try {
    let { username, password } = userDetails;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "Username is not found. Invalid login credentials.",
        success: false,
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: "Please make sure you are logging in from the right portal.",
        success: false,
      });
    }

    let isMatch = bcrypt.compare(password, user.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          user_id: user._id,
          role: user.role,
          username: user.username,
          email: user.email,
        },
        SECRET,
        { expiresIn: "2 days" }
      );

      let result = {
        username: user.username,
        role: user.role,
        token: `Bearer ${token}`,
        expiresIn: 168,
      };

      return res.status(200).json({
        ...result,
        message: "Successfully Loggrd in",
        success: true,
      });
    } else {
      return res.status(403).json({
        message: "Incorrect Password",
        success: false,
      });
    }
  } catch (err) {
    
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

///passport middleware
//for every route where you want to authorise request you need to pass this middleware and
//that request should also have header containing token

const userAuth = passport.authenticate("jwt", { session: false });

const serilizeUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    _id: user._id,
    role: user.role,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

///for role based autherisation pass check role middleware

const checkRole = (roles) => (req, res, next) => {
  return !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorised")
    : next();
};

module.exports = {
  userRegister,
  userLogin,
  userAuth,
  checkRole,
  serilizeUser,
};
