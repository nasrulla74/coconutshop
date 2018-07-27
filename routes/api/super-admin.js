const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const validateRegisterInput = require("../../validation/register");

const User = require("../../models/User");

// @route POST api/users/register super Admin
// @desc register super ADMIN user
// @access Public
router.post("/", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email, usertype: "super-admin" }).then(
    user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          usertype: "super-admin",
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(console.log(err));
          });
        });
      }
    }
  );
});

module.exports = router;
