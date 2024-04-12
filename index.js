const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { addAplication, getAplications } = require("./aplications.controller");
const { addUser, loginUser } = require("./users.controller");
const auth = require("./middlewares/auth");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());
app.use(cookieParser());

app.get("/login", async (req, res) => {
	res.render("login", {
		title: "Clinic App",
		error: undefined,
	});
});

app.post("/login", async (req, res) => {
	try {
		const token = await loginUser(req.body.email, req.body.password);

		res.cookie("token", token, { httpOnly: true });

		res.redirect("/application");
	} catch (e) {
		res.render("login", {
			title: "Clinic App",
			error: e.message,
		});
	}
});

app.get("/register", async (req, res) => {
	res.render("register", {
		title: "Clinic App",
		error: undefined,
	});
});

app.post("/register", async (req, res) => {
	try {
		await addUser(req.body.email, req.body.password);

		res.redirect("/login");
	} catch (e) {
		if (e.code === 11000) {
			res.render("register", {
				title: "Clinic App",
				error: "Такой Email уже зарегестрирован!",
			});

			return;
		}
		res.render("register", {
			title: "Clinic App",
			error: e.message,
		});
	}
});

app.get("/logout", (req, res) => {
	res.cookie("token", "", { httpOnly: true });

	res.redirect("/login");
});

app.use(auth);

app.get("/application", async (req, res) => {
	res.render("application", {
		title: "Clinic App",
		created: false,
		error: undefined,
	});
});

app.post("/application", async (req, res) => {
	try {
		await addAplication(
			req.body.userName,
			req.body.phoneNumber,
			req.body.message
		);
		res.render("application", {
			title: "Clinic App",
			created: true,
			error: false,
		});
	} catch (e) {
		console.log("Ошибка при создании заявки", e);
		res.render("application", {
			title: "Clinic App",
			created: false,
			error: true,
		});
	}
});

app.get("/", async (req, res) => {
	res.render("index", {
		title: "Clinic App",
		applications: await getAplications(),
		error: false,
	});
});

mongoose
	.connect(
		"mongodb+srv://emilbekov_m:Miran2604@cluster100.obefb6j.mongodb.net/Clinic?retryWrites=true&w=majority&appName=Cluster100"
	)
	.then(() => {
		app.listen(port, () => {
			console.log(chalk.green(`Server has been started on port ${port}...`));
		});
	});
