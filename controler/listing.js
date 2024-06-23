const Listing = require("../models/listing.js");
const mbxStyles = require('@mapbox/mapbox-sdk/services/geocoding');
const ACCESS_TOKEN = 'pk.eyJ1IjoiY2hpenVydW1penVoYXJhIiwiYSI6ImNseGx6dW5ycTAzMjkycnBteG1hdm05NTkifQ.kdO1d_mxFkpkU_81xktnMA';
const geocodingClient = mbxStyles({ accessToken: ACCESS_TOKEN });


module.exports.index = async (req,res) => {
	let data = await Listing.find()
	await res.render("./index.ejs",{data});
};

module.exports.detailedView = async (req,res) => {
	let {id} = req.params;
	let data = await Listing.findById(id).populate( {path:"reviews", populate: {path:"author"} } ).populate("owner");
	if(!data){
		req.flash("error","Listing you are trying to find does not exist anymore");
		res.redirect("/listing");
	}

	let response = await geocodingClient.forwardGeocode({
	  query: `${data.location},${data.country}`,
	  limit: 1
	})
	  	.send();
	data.cordinates = response.body.features[0].center;

	await res.render("./view.ejs",{data});
};

module.exports.newListingForm = (req,res) => {
	res.render("new.ejs");
};

module.exports.newListingCreationInDatabase = async(req,res,next) => {
	let data = req.body;
	let url = req.file.path;
	let filename = req.file.filename;
	data.image = {url,filename};
	if( !data.image.url.length){
		data.image = "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09"; 
	}
	data.owner = req.user._id;
	await Listing.insertMany(data);
	req.flash("success","New listind added successfully");
	res.redirect("/listing");
};

module.exports.renderEditForm = async (req,res) => {
	let {id} = req.params;
	let data = await Listing.findById(id);
	if(!data){
		req.flash("error","Listing you are trying to find does not exist anymore");
		res.redirect("/listing");
	}
	res.render("./edit.ejs",{data});
};

module.exports.listingUpdationInDatabase = async (req,res) => {
	let {id} = req.params;
	let data = req.body;
	if(typeof req.file !== "undefined"){
		let url = req.file.path;
		let filename = req.file.filename;
		data.image = {url,filename};
	}
	await Listing.findByIdAndUpdate(id,data);
	res.redirect(`/details/${id}`);
};

module.exports.destroyListing = async (req,res) => {
	let {id} = req.params;
	await Listing.findByIdAndDelete(id)
	req.flash("success","Listing is deleted successfully");
	res.redirect("/listing");
};