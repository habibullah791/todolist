import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import _ from "lodash";

import routerList from "./Routes/list.js"

const PORT = 3000
const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



//  Middle Ware
app.use("/", routerList);


// Connect to database
const CONNECTION_URL = "mongodb://localhost:27017/todolistDB";
// Connecting to the database

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server started on port: ${PORT}`)))
    .catch((err) => console.log("OPS !!"));
