const express = require("express");
const bcrypt = require("bcrypt");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middlewares/auth");
const email = require("../emails/account");

// ADD USER
router.post("/user", async (req, res) => {
  try {
    const newUser = new User(req.body);
    let token = await newUser.generateToken();
    let user = await newUser.save();
    email.sendWelcomeMail(user.name, user.email);
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Logout user
router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token != req.token);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send("errorr");
  }
});

// Logout user
router.post("/user/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send("errorr");
  }
});

// GET USERS
router.get("/users/me", auth, async (req, res) => {
  const { name, email, age, _id } = req.user;
  const data = {
    name,
    email,
    age,
    _id
  };
  res.send(data);
});

// GET SINGLE USER
router.get("/user/:id", async (req, res) => {
  let _id = req.params.id;

  try {
    let user = await User.findById(_id);
    if (user) {
      res.send(user);
    } else {
      return res.status(404).send("not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// UPDATE USER
router.patch("/user/me", auth, async (req, res) => {
  try {
    let updates = Object.keys(req.body);
    updates.forEach(element => (req.user[element] = req.body[element]));

    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE USER
router.delete("/user/me", auth, async (req, res) => {
  try {
    req.user.remove();
    email.setDeleteAccountMail(req.user.email);
    res.send(req.user);
  } catch (error) {
    res.status(404).send(error);
  }
});

// LOGIN USER
router.post("/user/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    let token = await user.generateToken();
    if (user) {
      let hashpassword = await bcrypt.compare(req.body.password, user.password);
      if (hashpassword) {
        res.send({ token });
      } else {
        return res.send("password not correct!");
      }
    } else {
      return res.status(404).send("E-mail not match!");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
