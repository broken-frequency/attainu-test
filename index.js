const express = require("express");
var exphbs = require("express-handlebars");
const path = require("path");

const app = express();

app.get("/users", (req, res) => {
  var data = require(path.join(__dirname, "public/data.json"));
  res.json(data);
});

//Set static folder
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

app.get("/", function(req, res, next) {
  res.render("index", { layout: false });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
