const express = require("express")

const server = express.Router()
const taskDb = require("./task-model")
const errHelper = require("../errors/errHelper")

//-----------------------------------------------------------
// @route    /api/task
// @desc     get task based on query
// @Access   Public
//-----------------------------------------------------------
server.get("/search", async (req, res) => {
  const name = req.query.name

  try {
    const tasks = await findAllBy.get("task", { projectName: name })
    res.json(tasks)
  } catch (err) {
    errHelper(500, err.errno || err, res)
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

  try {
    const posted = await taskDb.add("task", {
      task: item.task,
      projectName: item.projectName,
      projectId: item.projectId
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
