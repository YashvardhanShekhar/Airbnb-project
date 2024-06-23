const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.postReview = async(req,res) => {
	let {id} = req.params;
	let listing = await Listing.findByIdAndUpdate(id);
	let newReview = new Review(req.body.review);
	newReview.author = req.user._id;
	await newReview.save();
	listing.reviews.push(newReview);
	await listing.save();
	req.flash("success","Review is posted successfully");
	res.redirect(`/details/${id}`);
};

module.exports.destroyReview = async(req,res) =>{
	let {id,idreview} = req.params;
	await Listing.findByIdAndUpdate( id, {$pull: {reviews: idreview} } );
	await Review.findByIdAndDelete(idreview);
	req.flash("success","Review is deleted successfully");
	res.redirect(`/details/${id}`);
};
