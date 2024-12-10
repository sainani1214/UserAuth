const express = require('express');
const app = express();
const dotenv = require('dotenv')
const db = require("./config/db")
const authRoutes = require('./routes/auth-routes')
const cookieParser = require('cookie-parser')


app.use(cookieParser());
db();

dotenv.config();

const PORT = process.env.PORT || 3000


app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/api/auth", authRoutes)

app.listen(PORT)
