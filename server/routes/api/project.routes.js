const express = require("express");
const router = express.Router();
const axios = require('axios');

const Project = require("../../models/Project");
const User = require("../../models/User");
const Rows = require("../../models/Rows");

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
    res.status(200).json(fonts);
  })
  .catch(error => {
    res.status(500).json({ message: "Error retrieving Google Fonts" });
  });
});

router.get("/:projectPath", (req, res, next) => {
  const path = req.params.projectPath;

  Project.findOne({ path: path }).populate('rows')
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

  if(req.file){
    Project.findOneAndUpdate(
      { path }, 
      { $push: { assets: {secure_url : req.file.secure_url, format: req.file.format, name: req.file.originalname} } },
    )
    .then(projectUpdated => {
      res.status(200).json(projectUpdated);
    })
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
})

router.delete("/assets/:assetId", (req, res, next) => {
  const { assetId } = req.params;

  Project.findOneAndUpdate(
    { assets: { $elemMatch: { _id: assetId } } },
    { $pull: { assets: {_id: assetId}},
    new : true }
  ).then(assetRemovedFromProject => {
    res.status(200).json(assetRemovedFromProject);
  });
});

// Updated project (add brand preset)
router.put("/textStyle/:path/:styleId?", (req, res, next) => {
  const { path, styleId } = req.params;


  // todo: definir qué ocurre cuando ya existe en la base de datos
  // if (id === "undefined") {
  //   Project.findOneAndUpdate(
  //     { path },
  //     { $push: { textStyle: req.body } },
  //     { new: true }
  //   ).then(projectUpdated => {
  //     res.status(200).json(projectUpdated);
  //   });
  // } else {
    Project.findOneAndUpdate(
      { textstyles: { $elemMatch: { _id: styleId } } },
      { "textstyles.$": req.body },
      { new: true }
    ).then(projectUpdated => {
      res.status(200).json(projectUpdated);
    });
  // }
});

router.get("/textstyle/:styleId?", (req, res, next) => {
  const styleId = req.params.styleId;

  Project.findOne({ textstyles: { $elemMatch: { _id: styleId } } })
    .select({textstyles : 1, typeset: 1})
    .then(textstylesData => {
      res.status(200).json(textstylesData);
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving project" });
    });
});

router.post(`/newRow/:projectPath`, (req, res,next) => {
  const projectPath = req.params.projectPath

  if(req.body.layout === "is-full"){
    Rows.create({
      layout: 'is-full', 
      slots: ["is-full"]
    })
    .then(newRow => {
      return Project.findOneAndUpdate(
      { path: projectPath },
      { $push: { rows: newRow._id } },
      { new: true }
    )
    .populate('rows')
    .then(projectUpdated => {
      res.status(200).json(projectUpdated);
      });
    });
  }

  if(req.body.layout === "is-half"){
    Rows.create({
      layout: 'is-half', 
      slots:[ "is-half", "is-half"]
    })
    .then(newRow => {
      return Project.findOneAndUpdate(
      { path: projectPath },
      { $push: { rows: newRow._id} },
      { new: true }
    )
    .populate('rows')
    .then(projectUpdated => {
      res.status(200).json(projectUpdated);
      });
    });
  }

  if(req.body.layout === "is-one-third"){
    Rows.create({
      layout: 'is-one-third', 
      slots:[ "is-one-third", "is-one-third", "is-one-third"]
    })
    .then(newRow => {
      return Project.findOneAndUpdate(
      { path: projectPath },
      { $push: { rows: newRow._id } },
      { new: true }
    )
    .populate('rows')
    .then(projectUpdated => {
      res.status(200).json(projectUpdated);
      });
    });
  }

});

router.delete("/rows/:rowId", (req, res, next) => {
  const { rowId } = req.params;

  Rows.findByIdAndDelete({_id: rowId})
  .then(deletedRow => {
    return Project.findOneAndUpdate(
      { rows: { $elemMatch: { _id: rowId } } },
      { $pull: { rows: {_id: deletedRow._id}},
      new : true }
    ).then(rowRemovedFromProject => {
      res.status(200).json(rowRemovedFromProject);
    })
  })
});


router.put('/rows/:rowId', (req, res,next) => {
    const { rowId } = req.params;
    const {typeOfContent, path, slotIdx} = req.body

    Project.findOne({path})
    .then(foundProject => {
    
        let newObject = {
          colorPalette: foundProject.colorPalette,
          order: slotIdx
        }

        return newObject;
    })
    .then(newObject => {
      Rows.findByIdAndUpdate({_id: rowId},
        {$push : {content: {...newObject}}},
        {returnNewDocument: true,
        new : true,
        strict : false,}
      )
      .then(slotUpdated => {
        res.status(200).json(slotUpdated);
      })
  
    })
})

// router.put('/rows/:rowId', (req,res,next)=> {
//   const { rowId } = req.params;
//   const {typeOfContent, path} = req.body
//   // let rowObjectId = mongoose.Types.ObjectId(rowId)



//   Project.findOne({ path })
//   .then(foundProject => {

//     Rows.findById({_id: rowId})
//     .then(foundRow => {
//       let newObject = {
//         colorPalette: foundProject.colorPalette,
//         slot: foundRow.content[0].slot
//       }

//       Rows.findByIdAndUpdate({_id: rowId},
//         {$set : {newObject}},
//         {returnNewDocument: true,
//         new : true,
//         strict : false,}
//       )
//       .then(slotUpdated => {
//         console.log(slotUpdated)
//       })
//     })
//   })
// })


  // return Rows.findByIdAndUpdate(
  //   {_id: rowId},
  //   {$set : {"content.$": newObject}}
  // ).then(slotUpdated => {
  //   console.log(slotUpdated)
  //   // res.status(200).json(textstylesData);
  // })





module.exports = router;
