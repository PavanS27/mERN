const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const requireLogin = require("../middleware/requireLogin");
const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");

//

const transporter = nodemailer.createTransport(
  sendgrid({
    auth: {
      api_key:
        "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",
    },
  })
);

router.post("/signup", (req, res) => {
  const { name, password, email, pic } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "plz add all the details" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "user already exists" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
          pic,
        });

        user.save().then((user) => {
          transporter.sendMail({
            to: user.email,
            from: "No-reply@insta.com",
            subject: "signup success",
            html: "<h1>Welcome to CoronaGram</h1>",
          });
          res.json({ message: "User save success" }).catch((err) => {
            console.log(err);
          });
        });
      });
    })

    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please provide email and password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({ message: "Successfully Signed in" });
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, followers, following, pic } = savedUser;
          res.json({
            token,
            user: { _id, name, email, followers, following, pic },
          });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
module.exports = router;
