// 1. Import express.
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

var cors = require("cors");

//Import routes
const instagramRoutes = require("./Instagram/routes/api_instagram");
const userRoutes = require("./Instagram/routes/api_user");

const mongodb = require("./config/mongodb");

mongodb.connect();

//2. Creating a server
const server = express();

//3. Assigning port to server
server.listen("3200", () => {
  console.log("Express is listening on 3200");
});

server.use(express.static("public"));

//parsing request body for all requests
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(cors());

//File upload
server.use(fileUpload());

//5. Handle api requests
// Server.use method takes all request menthods
server.use("/api/instagram", instagramRoutes);
server.use("/api/user", userRoutes);

//4. Handel default request from client
server.get("/", (req, res) => {
  res.send("Hello from express");
});
