const path = require("path");
const express = require("express");

const app = express();
const publicDirectory = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Photo Frame App"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About App"
  });
});

app.get("/weather", (req, res) => {
  res.send("Weather page, it's raining");
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
