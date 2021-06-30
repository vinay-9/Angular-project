
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
// mongoose
//   .connect(
//     "mongodb+srv://max:" +
//       process.env.MONGO_ATLAS_PW +
//       "@cluster0-ntrwp.mongodb.net/node-angular"
//   )
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });


// mongodb+srv://vinay:<password>@cluster0-gpac9.mongodb.net/test?retryWrites=true&w=majority
//mongo "mongodb+srv://cluster0-gpac9.mongodb.net/test"  --username vinay
// password for vinay -

//mongodb+srv://vinay:<password>@cluster0-gpac9.mongodb.net/test?retryWrites=true&w=majority
mongoose
  .connect(
    "mongodb+srv://vinay:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0-gpac9.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser:
        true,useUnifiedTopology: true  }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;

