const express = require('express');
const router = express.Router();

const Project = require('../../models/Project')
const User = require('../../models/User')

router.get('/', (req, res, next) => {

  User.findById(req.user._id).select("projects").populate('projects')
  .then(userProjects => {
    res.status(200).json(userProjects.projects)
  })
  .catch(error => {
    res.status(500).json({message: 'Something went wrong'})
  })

})

router.post('/new', (req, res, next) => {
    const { title, path } = req.body;
    Project.findOne({path})
    .then(haveFoundPath => {

        // Path has to be unique
        if(haveFoundPath) {
            res.status(400).json({ message: "Path taken. Choose another one." });
            return;
        }

        const newProject = new Project({
            title, 
            path
          })
        
          newProject.save()
          .then(project => {
            res.status(200).json(project)
          })
          .catch(error => {
            res.status(500).json({message: 'Error saving new Project'})
          })
    })
  })


module.exports = router;
