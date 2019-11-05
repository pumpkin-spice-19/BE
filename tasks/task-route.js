const express = require("express")

const server = express.Router()
const taskDb = require("./task-model")
const errHelper = require("../errors/errHelper")

//-----------------------------------------------------------
// @route    /api/task
// @desc     get task based on query
// @Access   Public
// @example http://localhost:5000/api/task?name=Inbox
//-----------------------------------------------------------
server.get("/search", async (req, res) => {
  const name = req.query.name
  if (!name) {
    return res.status(400).json({ message: "Name query is required!" })
  }
  try {
    const tasks = await taskDb.findAllBy("task", { projectName: name })
    if (tasks.length) {
      res.json(tasks)
    } else {
      res.json([])
    }
  } catch ({ message }) {
    console.log(message)
    res.status(500).json({ message })
    // errHelper(500, err.errno || err, res)
  }
})

//-----------------------------------------------------------
// @route    /api/task
// @desc     get task
// @Access   Public
//-----------------------------------------------------------
server.get("/", async (req, res) => {
  try {
    const tasks = await taskDb.get("task")
    res.json(tasks)
  } catch (err) {
    errHelper(500, err.errno || err, res)
  }
})

//-----------------------------------------------------------
// @route    /api/task
// @desc     Add task
// @Access   Public
//-----------------------------------------------------------
server.post("/", async (req, res) => {
  const item = req.body
  if (!item.task) {
    return res.status(400).json({ message: "task field is required" })
  }
  if (!item.projectName) {
    return res.status(400).json({ message: "projectName field is required" })
  }
  if (!item.date) {
    return res.status(400).json({ message: "date field is required" })
  }

  try {
    const posted = await taskDb.add("task", {
      task: item.task,
      date: item.date,
      projectName: item.projectName
    })
    res.status(201).json(posted)
  } catch (err) {
    errHelper(500, err.errno || err, res)
  }
})

//-----------------------------------------------------------
// @route    /api/task
// @desc    Update task Item
// @Access   Public
//-----------------------------------------------------------
server.put("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const exists = await taskDb.findBy("task", { id })

    if (exists) {
      const updated = await taskDb.update("task", id, req.body)
      res.json(updated)
    } else {
      return res
        .status(404)
        .json({ message: "task with that id does not exists" })
    }
  } catch (err) {
    errHelper(500, err.errno || err, res)
  }
})

//-----------------------------------------------------------
// @route    /api/task
// @desc    Remove task
// @Access   Public
//-----------------------------------------------------------
server.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const exists = await taskDb.findBy("task", { id })

    if (exists) {
      await taskDb.remove("task", id)
      res.json({ message: "sucessfully deleted task" })
    } else {
      return res
        .status(404)
        .json({ message: "task with that id does not exists" })
    }
  } catch (err) {
    errHelper(500, err.errno || err, res)
  }
})
module.exports = server
