const User = require("../models/User.js");

module.exports.renderSignUpForm = (req,res)=>{
	res.render("./signup.ejs");
};

module.exports.userSignUp = async (req,res)=>{
	try{
		let {username,email,password} = req.body;
		let newuser = new User({username,email});
		let reguser = await User.register(newuser,password);
		//for direct login
		req.login(reguser ,(err)=>{
			if(err){
				next(err);
			}
			req.flash("success","Welcome to WanderLust");
			res.redirect("/listing");
		});
	} 
	catch(err){
		req.flash("error",err.message );
		res.redirect("/signup");
	}
	
};

module.exports.renderLoginForm = (req,res)=>{
	res.render("./login.ejs");
};

module.exports.userLogin = async(req,res)=>{
	req.flash("success","Welcome to WanderLust");
	let url = res.locals.redirectUrl || "/listing";
	res.redirect(url);
};

module.exports.userLogout = (req,res,next)=>{
	req.logout((err)=>{
		if(err){
			next(err);
		}
		req.flash("success","You are loged out");
		res.redirect("/listing");
	});
};