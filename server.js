const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
    // host: "127.0.0.1",
    // user: "ugp",
    // password: "",
    // database: "smart-brain"
  }
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.get("/api/", (req, res) => {
  res.json("Home page");
});

app.post("/api/signin", signin.handleSignin(db, bcrypt));

app.post("/api/register", (req, res) => {
  register.handleRegister(res, req, db, bcrypt);
});

app.get("/api/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/api/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/api/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

//  Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //	Set static folder
  app.use(express.static("client/build"));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`app is running on port: ${PORT}`);
});
