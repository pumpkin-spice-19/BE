const express = require("express")

const server = express.Router()
const projectDb = require("./project-model")
const errHelper = require("../errors/errHelper")

// Things project :
// Make a project app to practice

//-----------------------------------------------------------
// @route    /api/project
// @desc     get project
// @Access   Public
//-----------------------------------------------------------
server.get("/", async (req, res) => {
  try {
    const projects = await projectDb.get("project")
    res.json(projects)
  } catch (err) {
    errHelper(500, err.errno || err, res)
  }
})

//-----------------------------------------------------------
// @route    /api/project
// @desc     Add project
// @Access   Public
//-----------------------------------------------------------
server.post("/", async (req, res) => {
  const item = req.body
  if (!item.name) {
    return res.status(400).json({ message: "Name field is required" })
  }
  if (!item.color) {
    return res.status(400).json({ message: "Color field is required" })
  }

  try {
    const posted = await projectDb.add("project", {
      name: item.name,
      color: item.color,
      fav: item.fav
    })

    res.status(201).json(posted)
  } catch (err) {
    errHelper(500, err.errno || err, res)
  }
})

//-----------------------------------------------------------
// @route    /api/project
// @desc    Update project Item
// @Access   Public
//-----------------------------------------------------------
server.put("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const exists = await projectDb.findBy("project", { id })

    if (exists) {
      const updated = await projectDb.update("project", id, req.body)
      res.json(updated)
    } else {
      return res
        .status(404)
        .json({ message: "project with that id does not exists" })
    }
  } catch (err) {
    errHelper(500, err.errno || err, res)
  }
})

//-----------------------------------------------------------
// @route    /api/project
// @desc    Remove project
// @Access   Public
//-----------------------------------------------------------
server.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const exists = await projectDb.findBy("project", { id })

    if (exists) {
      await projectDb.remove("project", id)
      res.json({ message: "sucessfully deleted project" })
    } else {
      return res
        .status(404)
        .json({ message: "project with that id does not exists" })
    }
  } catch (err) {
    errHelper(500, err.errno || err, res)
  }
})
module.exports = server
