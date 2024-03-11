console.log("do it");

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const productsData = require("./jsons/products.json");

const Product = require("./models/product-model");

const productsRoute = require("./routes/product-route");

//connect To DB

mongoose.connect("mongodb://localhost:27017/StoreApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const populateDB = async () => {
  await Product.deleteMany();
  await Product.create(productsData)
    .then(() => {
      console.log("Data inserted successfully");
    })
    .catch((err) => {
      console.error("Error inserting data into MongoDB:", err);
    });
};

populateDB();

//MiddleWare
app.use(cors());
app.use(bodyParser.json());

app.use(productsRoute);

//listen to server
const port = 5002;
app.listen(port, () => {
  console.log(`Sever listening to ${port} port`);
});
