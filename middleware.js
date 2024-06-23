const Listing = require("./models/listing.js");
const Review = require("./models/review.js");


module.exports.isLoggedIn = (req,res,next)=>{
	if(!req.isAuthenticated()){
		req.session.redirectUrl = req.originalUrl;
		req.flash("error","you must login to perform certain tasks");
		return res.redirect("/login");
	}
	next();
}

module.exports.saveUrl = (req,res,next)=>{
	if(req.session.redirectUrl){
		res.locals.redirectUrl = req.session.redirectUrl;
	}
	next();
}

module.exports.isOwner = async(req,res,next)=>{
	let {id} = req.params;
	let listingdata = await Listing.findById(id);
	if( !res.locals.currentuser.equals(listingdata.owner) ){
		req.flash("error","You are not allowed to access this information");
		res.redirect(`/details/${id}`);
	}
	next();
}

module.exports.isAuthor = async(req,res,next)=>{
	let {id,idreview} = req.params;
	let review = await Review.findById(idreview);
	if( !res.locals.currentuser.equals(review.author) ){
		req.flash("error","You are not allowed to delete this review");
		res.redirect(`/details/${id}`);
	}
	next();
}