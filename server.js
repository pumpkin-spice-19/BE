require("dotenv").config()

// connect express
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")

// routes
const project = require("./projects/project-route")
const task = require("./tasks/task-route")

// init express
const server = express()

// Middleware
server.use(express.json()) // parse incoming request to json
server.use(helmet()) // helps secure your express by setting http headers
server.use(cors()) // cross-domain request sharing CORS
server.use(morgan("dev")) // debugging logger

// use routes
server.use("/api/project", project)
server.use("/api/task", task)

// index route display name
server.get("/", (req, res) => {
  res.status(200).json({ message: "HELLO WORLD🔥" })
})

module.exports = server
