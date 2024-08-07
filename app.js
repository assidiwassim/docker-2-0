const express = require("express");
const mongoose = require("mongoose");
const Item = require("./models/Item");

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));


const connectInternalDatabase = "mongodb://my-mongodb:27017/my-db"; //(1)
//const connectExternalDatabase = "mongodb://localhost:27011/my-db"; //(2)
// Connect to MongoDB
mongoose
  .connect(connectInternalDatabase, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error = ",err));

app.get("/", (req, res) => {
  res.send("Hello community .... !");
});

app.get("/items", (req, res) => {
  Item.find()
    .then((items) => res.send({ items }))
    .catch((err) => res.status(500).json({ err }));
});

app.post("/items/add", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem
    .save()
    .then((item) => res.send({ message: "item saved successfully", item }))
    .catch((err) => res.status(500).json({ err }));
});

const port = 3000;

app.listen(port, () => console.log("Server running on port 3000"));