const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const listingcontroler = require("../controler/listing.js")
const {listingSchema} = require("../schema.js");
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });


const validateListing = (req,res,next) => {
	let result = listingSchema.validate(req.body);
	if(result.error){
		throw new ExpressError(400,result.error);
	}else {
		next();
	}
}

//all listings
router.get("/listing", wrapAsync(listingcontroler.index) );

//detailed view
router.get("/details/:id", wrapAsync(listingcontroler.detailedView));

//create new listing new listing create in DB
router.route("/new")
	.get( isLoggedIn,wrapAsync(listingcontroler.newListingForm))
	.post( isLoggedIn, upload.single("image"), validateListing, wrapAsync(listingcontroler.newListingCreationInDatabase));

// update form html page update in database
router.route("/update/:id")
	.get( isLoggedIn, isOwner, wrapAsync(listingcontroler.renderEditForm))
	.post( isLoggedIn, isOwner, upload.single("image"), validateListing, wrapAsync(listingcontroler.listingUpdationInDatabase));

// Delete from DB
router.get("/delete/:id", isLoggedIn, isOwner, wrapAsync(listingcontroler.destroyListing));

module.exports = router;