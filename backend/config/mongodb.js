//Import Mongodb
const mongodb = require("mongodb");

const url =
  "mongodb+srv://akash:test123@cluster0.jaiyu.mongodb.net/instagran?retryWrites=true&w=majority";

const mongodbClient = mongodb.MongoClient;

var connectedClient;

exports.connect = () => {
  mongodbClient
    .connect(url)
    .then((client) => {
      connectedClient = client;
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCollection = (nameOfCollection) => {
  return connectedClient.db("instagran").collection(nameOfCollection);
};
