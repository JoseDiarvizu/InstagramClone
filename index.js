if (typeof localStorage === "undefined" || localStorage === null) {
  let LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localStorage');
}

const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const publicDirectory = path.join(__dirname, "./public");
const uploadDirectory = path.join(__dirname, "./");
const app = express();

app.use(express.static(publicDirectory));
app.use(express.static(uploadDirectory));
//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.set("view engine", "hbs");

//Define routes
app.use("/", require("./routes/pages"));
app.use("/api", require("./routes/api"));

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running in port ${process.env.APP_PORT}`);
});

process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, exitCode) {
  localStorage.clear(); // this will delete userId and userRole in case server closes
  if (options.cleanup) console.log("clean");
  if (exitCode || exitCode === 0) console.log(exitCode);
  if (options.exit) process.exit();
}

//do something when app is closing
process.on("exit", exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on("uncaughtException", exitHandler.bind(null, { exit: true }));