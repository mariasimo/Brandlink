const express = require("express");
const router = express.Router();

const Project = require("../../models/Project");
const User = require("../../models/User");


router.get("/", (req, res, next) => {

  User.findById(req.user._id)
    .select("projects")
    .populate("projects")
    .then(userProjects => {
      res.status(200).json(userProjects.projects);
    })
    .catch(error => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

router.get("/:projectPath", (req, res, next) => {
  const  path  = req.params.projectPath;

  Project.findOne({path : path})
    .then(projectFound => {
      res.status(200).json(projectFound);
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving project" });
    });
});

router.post("/new", (req, res, next) => {
  const { title, path } = req.body;
  const id = req.user._id;

  Project.findOne({ path }).then(haveFoundPath => {
    // Path has to be unique
    if (haveFoundPath) {
      res.status(400).json({ message: "Path taken. Choose another one." });
      return;
    }

    const newProject = new Project({
      title,
      path,
      colorPalette: null
    });

    newProject
      .save()
      .then(projectSaved => {
        return User.findByIdAndUpdate(id, {
          $push: { projects: projectSaved._id }
        });
      })
      .then(projectSaved => {
        res.status(200).json(projectSaved);
      })
      .catch(error => {
        res.status(500).json({ message: "Error saving new Project" });
      });
  });
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  const UserId = req.user._id;

  Project.findByIdAndDelete(id).then(deletedProject => {
    return User.findByIdAndUpdate(UserId, {
      $pull: { projects: deletedProject._id },
      new: true
    })
      .then(() => {
        res.status(200).json({ message: "Project deleted" });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
      });
  });
});

router.put("/:path", (req, res, next) => {
  const { path } = req.params;

  Project.findOneAndUpdate(
    { path },
    {$push: { colorPalette: req.body }},
    { new: true }
  ).then(projectUpdated => {
    res.status(200).json(projectUpdated);
  });
});

module.exports = router;
