const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const data = require("./data.js");

async function inlist() {
	await Listing.deleteMany();
	await Listing.insertMany(data);
	await console.log("data intialized");
}

inlist();