const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signup, signin, signout } = require("../controllers/auth");

//----------------
//SignUp
router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name must be atleast 3 Characters"),
    check("email").isEmail().withMessage("Email is not valid or required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be atleast 5 Characters"),
  ],
  signup
);

//----------------
//SignIn
router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email is not valid or required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be atleast 5 Characters"),
  ],
  signin
);

//----------------
//SignOut
router.post("/signout", signout);

module.exports = router;
