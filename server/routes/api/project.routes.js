const express = require('express');
const router = express.Router();
const axios = require('axios');

const Project = require('../../models/Project');
const User = require('../../models/User');
const Rows = require('../../models/Rows');

const uploader = require('../../configs/cloudinary.config');

router.get('/', (req, res, next) => {
  User.findById(req.user._id)
    .select('projects')
    .populate('projects')
    .then(userProjects => {
      res.status(200).json(userProjects.projects);
    })
    .catch(error => {
      res.status(500).json({ message: 'Something went wrong' });
    });
});

router.get('/getGoogleFonts', (req, res, next) => {
  axios
    .get(
      'https://typekit.com/api/v1/json/kits/gnh6ghd/?token=0bb2988cbd31ce44bda853c78df227e26a0d86c8'
    )
    .then(fonts => {
      res.status(200).json(fonts);
    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving Google Fonts' });
    });
});

router.post('/new', (req, res, next) => {
  const { title, path } = req.body;
  const id = req.user._id;

  Project.findOne({ path }).then(haveFoundPath => {
    // Path has to be unique
    if (haveFoundPath) {
      res.status(400).json({ message: 'Path taken. Choose another one.' });
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
        res.status(500).json({ message: 'Error saving new Project' });
      });
  });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const UserId = req.user._id;

  Project.findByIdAndDelete(id).then(deletedProject => {
    return User.findByIdAndUpdate(UserId, {
      $pull: { projects: deletedProject._id },
      new: true
    })
      .then(() => {
        res.status(200).json({ message: 'Project deleted' });
      })
      .catch(error => {
        res.status(500).json({ message: 'Something went wrong' });
      });
  });
});

router.get('/project/:userId', (req, res, next) => {
  const { userId } = req.params;

    Project.findById({ _id: req.user.activeProject })
      .then(project => {
        res.status(200).json(project);
      })
      .catch(error => {
        res.status(500).json({ message: 'Something went wrong' });
      });
});

// Updated project (add brand preset)
router.put('/color/:projectId/:id?', (req, res, next) => {
  const { projectId, id } = req.params;

  console.log(req.params)

  if (id === 'undefined') {
    Project.findByIdAndUpdate(
      { _id: projectId },
      { $push: { colorPalette: req.body } },
      { new: true }
    ).then(projectUpdated => {
      res.status(200).json(projectUpdated);
    });
  } else {
    Project.findOneAndUpdate(
      { colorPalette: { $elemMatch: { _id: id } } },
      { 'colorPalette.$': req.body },
      { new: true }
    ).then(projectUpdated => {
      res.status(200).json(projectUpdated);
    });
  }
});

router.get('/color/:colorId?', (req, res, next) => {
  const colorId = req.params.colorId;

  Project.findOne({ colorPalette: { $elemMatch: { _id: colorId } } })
    .select({ colorPalette: 1 })
    .then(colorData => {
      res.status(200).json(colorData);
    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving project' });
    });
});

router.delete('/color/:colorId', (req, res, next) => {
  const { colorId } = req.params;

  Project.findOneAndUpdate(
    { colorPalette: { $elemMatch: { _id: colorId } } },
    { $pull: { colorPalette: { _id: colorId } }, new: true }
  ).then(colorRemoveFromProject => {
    res.status(200).json(colorRemoveFromProject);
  });
});

// Updated project (add brand preset)
router.put('/type/:path', (req, res, next) => {
  const { path, id } = req.params;

  Project.findByIdAndUpdate(
    { _id: req.user.activeProject },
    { $push: { typeset: req.body } },
    { new: true }
  )
    .then(projectUpdated => {
      res.status(200).json(projectUpdated);
    })
    .catch(error => {
      res.status(500).json({ message: 'Error adding new type in db' });
    });
});

router.delete('/type/:typeId', (req, res, next) => {
  const { typeId } = req.params;

  Project.findOneAndUpdate(
    { typeset: { $elemMatch: { _id: typeId } } },
    { $pull: { typeset: { _id: typeId } }, new: true }
  ).then(typeRemovedFromProject => {
    res.status(200).json(typeRemovedFromProject);
  });
});

router.post('/uploadAsset/:path', uploader.single('file'), (req, res) => {

  if (req.file) {
    Project.findByIdAndUpdate(
      { _id: req.user.activeProject },
      {
        $push: {
          assets: {
            secure_url: req.file.secure_url,
            format: req.file.format,
            name: req.file.originalname
          }
        }
      }
    ).then(projectUpdated => {
      res.status(200).json(projectUpdated);
    });
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.delete('/assets/:assetId', (req, res, next) => {
  const { assetId } = req.params;

  Project.findOneAndUpdate(
    { assets: { $elemMatch: { _id: assetId } } },
    { $pull: { assets: { _id: assetId } }, new: true }
  ).then(assetRemovedFromProject => {
    res.status(200).json(assetRemovedFromProject);
  });
});

// Updated project (add brand preset)
router.put('/textStyle/:path/:styleId?', (req, res, next) => {
  const { path, styleId } = req.params;
  console.log(req.body)
  Project.findOneAndUpdate(
    { textstyles: { $elemMatch: { _id: styleId } } },
    { 'textstyles.$': req.body },
    { new: true }
  ).then(projectUpdated => {
    console.log(projectUpdated)
    res.status(200).json(projectUpdated);
  });
});

router.get('/textstyle/:styleId?', (req, res, next) => {
  const styleId = req.params.styleId;

  console.log(styleId)

  Project.findOne({ textstyles: { $elemMatch: { _id: styleId } } })
    // .select({ textstyles: 1, typeset: 1 })
    .then(textstylesData => {
      console.log(textstylesData)
      res.status(200).json(textstylesData);
    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving project' });
    });
});

router.get('/rows/:projectId', (req, res, next) => {
  const { projectId } = req.params;
  
    Project.findById(
      { _id: projectId },
      )
      .populate('rows')
      .then(projectRows => {
        res.status(200).json(projectRows.rows);
      })
      .catch(error => {
        res.status(500).json({ message: 'Error retrieving project' });
      });
});

router.post(`/newRow/:projectId`, (req, res, next) => {
  let layoutDescriptor;

  if (req.body.layout === 'is-full') {
    layoutDescriptor = {
      layout: 'is-full',
      slots: ['is-full']
    };
  }

  if (req.body.layout === 'is-half') {
    layoutDescriptor = {
      layout: 'is-half',
      slots: ['is-half', 'is-half']
    };
  }

  if (req.body.layout === 'is-one-third') {
    layoutDescriptor = {
      layout: 'is-one-third',
      slots: ['is-one-third', 'is-one-third', 'is-one-third']
    };
  }

  Rows.create(layoutDescriptor).then(newRow => {
    Project.findOneAndUpdate(
      { _id: req.user.activeProject },
      { $push: { rows: newRow._id } },
      { new: true }
    )
      .then(() => {
        console.log(req.user.activeProject)
        Project.findById({_id: req.user.activeProject})
        .populate('rows')
        .then(projectUpdated => {
          console.log(projectUpdated)
          res.status(200).json(projectUpdated);
        });
      })

  });
});


router.delete('/rows/:rowId', (req, res, next) => {
  const { rowId } = req.params;

  Rows.findByIdAndDelete({ _id: rowId }).then(deletedRow => {
    return Project.findOneAndUpdate(
      { rows: { $elemMatch: { _id: rowId } } },
      { $pull: { rows: { _id: deletedRow._id } }, new: true }
    ).then(rowRemovedFromProject => {
      res.status(200).json(rowRemovedFromProject);
    });
  });
});

router.put('/rows/:rowId', (req, res, next) => {
  const { rowId } = req.params;
  const { slotIdx, type } = req.body;

  Rows.findByIdAndUpdate(
    { _id: rowId },
    // { array: { $push: { property: {$each: ['value'], $position: 0 } } } }, 

    { content:{ $set: { type: type, order: slotIdx, $position: 0 } } },
    { returnNewDocument: true, new: true, strict: false }
  ).then(slotUpdated => {
    console.log(slotUpdated)
    res.status(200).json(slotUpdated);
  });
});


router.post('/rows/image/:rowId', uploader.single('file'), (req, res) => {
  console.log(req.file)
  const { rowId } = req.params;

  if (req.file) {
    Rows.findByIdAndUpdate(
      { _id: rowId },
      { $push: { content: { type: "assets", image: req.file.secure_url } } },
      { returnNewDocument: true, new: true, strict: false }
    ).then(slotUpdated => {
      console.log(slotUpdated)
      res.status(200).json(slotUpdated);
    });
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
});



// router.post('/rows/image/:rowId', uploader.single('file'), (req, res, next) => { 
//   console.log(uploadData)

//   console.log("req.file")
//   if (req.file) {
//     Project.findByIdAndUpdate(
//       { _id: req.user.activeProject },
//       {
//         $push: {
//           content: {
//             image: req.file.secure_url,
//           }
//         }
//       }
//     ).then(projectUpdated => {
//       console.log(projectUpdated)
//       res.status(200).json(projectUpdated);
//     });
//   } else {
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// });



module.exports = router;
