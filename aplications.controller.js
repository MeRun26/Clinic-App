const chalk = require("chalk");
const Aplication = require("./models/Aplications");

async function addAplication(userName, phoneNumber, message) {
	await Aplication.create({ userName, phoneNumber, message });

	console.log(chalk.bgGreen("Заявка успешно добавлена!"));
}

async function getAplications() {
	const aplications = await Aplication.find();

	return aplications;
}

module.exports = {
	addAplication,
	getAplications,
};
