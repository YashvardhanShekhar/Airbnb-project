if(process.env.NODE_ENV != 'production'){
	require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session  = require("express-session");
const MongoStore = require('connect-mongo');
const flash  = require("connect-flash");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const passport = require("passport");
const User = require("./models/User.js");
const userRouter = require("./routes/user.js");
const LocalStrategy = require("passport-local");

mongoose.connect(process.env.ATLAS_URL)
	.then(()=>console.log("database is connected"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs",ejsMate);

const store = MongoStore.create({
	mongoUrl: process.env.ATLAS_URL ,
	crypto: { secret: process.env.SECRET },
	touchAfter: 24*3600,
})

store.on("error", (err)=>{
	console.log("ERROR IN ATLAS STORE",err);
})

app.use(session({
	store,
	secret:process.env.SECRET,
	resave:false,
	saveUninitialized:true,
	cookie:{
		expires: Date.now() + 7 *24 *60 *60 *1000,
		maxAge: 7 *24 *60 *60 *1000,
		httpOnly:true,
	}, 
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate() ));
passport.serializeUser(User.serializeUser() );
passport.deserializeUser(User.deserializeUser() );



app.use((req,res,next)=>{
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");	
	res.locals.currentuser = req.user;
	next();
});

app.get("/",(req,res) =>{
	res.redirect("/listing");
});

app.use(listingRouter);
app.use(userRouter);
app.use("/listing/:id/review",reviewsRouter);

//known page address
app.all("*", (req,res,next) =>{
	next( new ExpressError(404,"Page not found !"));
});

//errors
app.use((err,req,res,next) =>{
	let { statusCode = 420 ,message = "Some error occured" } = err;
	let error = {statusCode, message};
	// res.send(`${statusCode} Warning: ${message}`);
	res.render("error.ejs",{error});
});

app.listen(8080,() => { console.log("server is listening on port 8080"); });
