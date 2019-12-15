const express = require("express");
const router = express.Router();
const axios = require('axios');

const Project = require("../../models/Project");
const User = require("../../models/User");

const uploader = require('../../configs/cloudinary.config')


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

router.get("/getGoogleFonts", (req, res, next) => {
  axios.get('https://typekit.com/api/v1/json/kits/gnh6ghd/?token=0bb2988cbd31ce44bda853c78df227e26a0d86c8')
  .then(fonts => {
    console.log(fonts.data)
    res.status(200).json(fonts);
  })
  .catch(error => {
    res.status(500).json({ message: "Error retrieving Google Fonts" });
  });
});

router.get("/:projectPath", (req, res, next) => {
  const path = req.params.projectPath;

  Project.findOne({ path: path })
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
      colorPalette: []
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

// Updated project (add brand preset)
router.put("/color/:path/:id?", (req, res, next) => {
  const { path, id } = req.params;

  console.log(req.body);
  console.log("Enters here: " + path, id);

  if (id === "undefined") {
    Project.findOneAndUpdate(
      { path },
      { $push: { colorPalette: req.body } },
      { new: true }
    ).then(projectUpdated => {
      res.status(200).json(projectUpdated);
    });
  } else {
    Project.findOneAndUpdate(
      { colorPalette: { $elemMatch: { _id: id } } },
      { "colorPalette.$": req.body },
      { new: true }
    ).then(projectUpdated => {
      console.log(projectUpdated)
      res.status(200).json(projectUpdated);
    });
  }
});


router.get("/color/:colorId?", (req, res, next) => {
  const colorId = req.params.colorId;

  Project.findOne({ colorPalette: { $elemMatch: { _id: colorId } } })
    .select({colorPalette : 1})
    .then(colorData => {
      res.status(200).json(colorData);
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving project" });
    });
});

router.delete("/color/:colorId", (req, res, next) => {
  const { colorId } = req.params;

  Project.findOneAndUpdate(
    { colorPalette: { $elemMatch: { _id: colorId } } },
    { $pull: { colorPalette: {_id: colorId}},
    new : true }
  ).then(colorRemoveFromProject => {

    res.status(200).json(colorRemoveFromProject);
  });
});



// Updated project (add brand preset)
router.put("/type/:path", (req, res, next) => {
  const { path, id } = req.params;

  console.log(req.body);
  console.log("Enters here: " + path);

  Project.findOneAndUpdate(
      { path },
      { $push: { typeset: req.body } },
      { new: true }
    ).then(projectUpdated => {
      res.status(200).json(projectUpdated);
    })
    .catch(error => {
      res.status(500).json({ message: "Error adding new type in db" });
    });
});


router.delete("/type/:typeId", (req, res, next) => {
  const { typeId } = req.params;

  Project.findOneAndUpdate(
    { typeset: { $elemMatch: { _id: typeId } } },
    { $pull: { typeset: {_id: typeId}},
    new : true }
  ).then(typeRemovedFromProject => {
    res.status(200).json(typeRemovedFromProject);
  });
});


router.post('/uploadAsset/:path', uploader.single('file'), (req, res) => {
  const {path} = req.params
  console.log(req.file)

  if(req.file){
    console.log(req.file.secure_url)
    Project.findOneAndUpdate(
      { path }, 
      { $push: { assets: {secure_url : req.file.secure_url, resource_type: req.file.resource_type} } },
      { new : true}
    )
    .then(projectUpdated => {
      console.log(projectUpdated)
    })
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
})


module.exports = router;
