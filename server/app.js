const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_URI } = require("./keys");

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongoose");
});
mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

require("./models/user");
require("./models/post");
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server at ${port}`);
});
