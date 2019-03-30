const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  varifynumber: String,
  totalEarned: Number,
  tokens: [],
});

userSchema.pre('save', async function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password'))
    return next();

  try {
    // generate a salt
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

    // hash the password along with our new salt
    const hash = await bcrypt.hash(this.password, salt);

    // override the plaintext password with the hashed one
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userSchema.methods.comparePassword = async function(password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return true;
  } catch (error) {
    return false;
  }
};

userSchema.methods.compareVarifynumber = async function(varifynumber) {
  try {
    const isMatch = await bcrypt.compare(varifynumber, this.varifynumber);
    return true;
  } catch (error) {
    return false;
  }
};

userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  delete obj.tokens;
  delete obj.totalEarned;
  return obj;
};

userSchema.methods.addToken = function(token) {
    this.tokens.push(token);
};
  
userSchema.methods.removeToken = function(token) {
    this.tokens = this.tokens.filter(t => t != token);
};
  
userSchema.methods.removeOldTokens = function() {
    this.tokens = auth.removeOldTokens(this.tokens);
};

userSchema.methods.addTotalEarned = function(earned) {
  this.totalEarned += earned;
};

const User = mongoose.model('User', userSchema);

// create a new user endpoint
router.post('/', async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).send({
      message: "username and password are required"
    });
  try {
    //  check to see if username already exists
    const existingUser = await User.findOne({
      username: req.body.username
    });
    if (existingUser)
      return res.status(403).send({
        message: "username already exists"
      });

    // create new user
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      varifynumber: req.body.varifynumber,
      totalEarned: 0
    });
    await user.save();
    login(user, res);
} catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// login endpoint
router.post('/login', async (req, res) => {
    if (!req.body.username || !req.body.password)
      return res.sendStatus(400);
  
    try {
      //  lookup user record
      const existingUser = await User.findOne({
        username: req.body.username
      });
      if (!existingUser)
        return res.status(403).send({
          message: "username or password is wrong"
        });
  
      // check password
      if (!existingUser.comparePassword(req.body.password))
        return res.status(403).send({
          error: "username or password is wrong"
        });
  
      login(existingUser, res);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

// Logout endpoint
router.delete("/", auth.verifyToken, async (req, res) => {
    // look up user account
    const user = await User.findOne({
      _id: req.user_id
    });
    if (!user)
      return res.clearCookie('token').status(403).send({
        error: "must login"
      });
  
    user.removeToken(req.token);
    await user.save();
    res.clearCookie('token');
    res.sendStatus(200);
});

// Get current user if logged in.
//logged in checking endpoint
router.get('/', auth.verifyToken, async (req, res) => {
    // look up user account
    const user = await User.findOne({
      _id: req.user_id
    });
    if (!user)
      return res.status(403).send({
        error: "must login"
      });
  
    return res.send(user);
});

async function login(user, res) {
  let token = auth.generateToken({
    id: user._id
  }, "24h");

  user.removeOldTokens();
  user.addToken(token);
  await user.save();

  return res
    .cookie("token", token, {
      expires: new Date(Date.now() + 86400 * 1000)
    })
    .status(200).send(user);
};

// varify endpoint
router.post('/varify', async (req, res) => {
  if (!req.body.varifynumber)
    return res.sendStatus(400);

  try {
    //  lookup user record
    const existingUser = await User.findOne({
      username: req.body.username
    });
    if (!existingUser)
      return res.status(403).send({
        message: "please log in correctly"
      });

    // check password
    if (!existingUser.compareVarifynumber(req.body.varifynumber))
      return res.status(403).send({
        error: "varify number is wrong"
      });

    else{
      const varify = true;
      return res.status(200).send(varify);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// total Earned endpoint
router.post('/totalEarned', auth.verifyToken, async (req, res) => {
  try {
    //  lookup user and update totalEarned
    const existingUser = await User.findOneAndUpdate(
      {
      user_id: req.user_id
     },
     {
       $set: {totalEarned: this.totalEarned + req.body.totalEarned}
     }
    );
    if (!existingUser)
      return res.status(403).send({
        message: "login please"
      });

    // update total Earned
    if (!existingUser.addTotalEarned(req.body.totalEarned))
      return res.status(403).send({
        error: "fail to update totalearned"
      });

    login(existingUser, res);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
                                           