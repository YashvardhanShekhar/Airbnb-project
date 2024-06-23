const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveUrl} = require("../middleware.js");
const userControler = require("../controler/user.js");

router.route("/signup")
	.get(userControler.renderSignUpForm)
	.post(wrapAsync(userControler.userSignUp));

router.route("/login")
	.get(userControler.renderLoginForm)
	.post(saveUrl,
		passport.authenticate('local', {failureRedirect:'/login' ,failureFlash:true} ),
		wrapAsync(userControler.userLogin),
	);

router.get("/logout", userControler.userLogout);

module.exports = router;