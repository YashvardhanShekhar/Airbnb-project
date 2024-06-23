const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isAuthor} = require("../middleware.js");
const reviewControler = require("../controler/reviews.js")

const {reviewSchema} = require("../schema.js");

const validateReview = (req,res,next) => {
	let result = reviewSchema.validate(req.body);
	if(result.error){
		throw new ExpressError(400,result.error);
	}else {
		next();
	}
}

//post reviews
router.post("/", validateReview, isLoggedIn, wrapAsync(reviewControler.postReview));

//delte review
router.post("/:idreview", isLoggedIn, isAuthor, wrapAsync(reviewControler.destroyReview));

module.exports = router;