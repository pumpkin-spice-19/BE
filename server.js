require("dotenv").config()

// connect express
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")

// routes
const todo = require("./sample/todo-route")

// init express
const server = express()

// Middleware
server.use(express.json()) // parse incoming request to json
server.use(helmet()) // helps secure your express by setting http headers
server.use(cors()) // cross-domain request sharing CORS
server.use(morgan("dev")) // debugging logger

// use routes
server.use("/api/todo", todo)
server.use("/api/doctor", doctor)
server.use("/api/patient", patient)

// index route display name
server.get("/", (req, res) => {
  res.status(200).json({ message: "HELLO WORLD🔥" })
})

module.exports = server
