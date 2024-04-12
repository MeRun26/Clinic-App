const mongoose = require("mongoose");

const ApplicationSchema = mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	message: {
		type: String,
	},

	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
