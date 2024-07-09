const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 8080;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
	const time = new Date();

	console.log(
		`-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
	);
	if (Object.keys(req.body).length > 0) {
		console.log("Containing the data:");
		console.log(`${JSON.stringify(req.body)}`);
	}
	next();
});

app.get("/", (req, res) => {
	const greeting = {
		title: "Welcome to the Express App!",
		content: "Please log in",
	};
	res.render("index", greeting);
});
app.get("/login", (req, res) => {
	res.render("login");
});
app.post("/login", (req, res) => {
	console.log("req.body", req.body);
	const { name } = req.body;
	console.log(`${name} logged in`);
	res.redirect(`/greet/${name}`);
});
app.get("/greet/:name", (req, res) => {
	console.log("something");
	const { name } = req.params;
	res.send(`Hi ${name}!`);
});
app.get("/download", (req, res) => {
	const filePath = path.join(__dirname, "public", "images", "food.jpg");
	res.download(filePath, "downloaded-image.jpg", (err) => {
		if (err) {
			console.error("Error downloading file:", err);
		}
	});
});

app.listen(port, () => {
	console.log(`server listening on port:${port}`);
});
