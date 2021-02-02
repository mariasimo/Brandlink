const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/User");
const Project = require('../../models/Project');

const uploader = require('../../configs/cloudinary.config')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);

router.post("/signup", ( req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password ) res.status(400).json({ message: "Provide username and password" });

  if (password.length < 2) {
    res.status(400).json({
      message: "Please make your password at least 3 characters long"
    });
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }
    if (foundUser) {
      res.status(400).json({ message: "Username taken" });
      return;
    }
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass
    });

    newUser.save(err => {
      if (err) {
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }

      // Automatically log in user after sign up
      // .login() here is actually predefined passport method
      req.login(newUser, err => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
          return;
        }

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(newUser);
      });
    });
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});


router.post('/new-project', (req, res, next) => {
  const { title, path } = req.body;
  const id = req.user._id;

  Project.findOne({ path }).then(haveFoundPath => {

    if (haveFoundPath) {
      res.status(400).json({ message: 'Path taken. Choose another one.' });
      return;
    }

    const newProject = new Project({
      title,
      path,
      colorPalette: []
    });


    Project.findByIdAndDelete(id).then(deletedProject => {
      return User.findByIdAndUpdate(UserId, {
        $pull: { projects: deletedProject._id },
        new: true
      })
        .then(project => {
          res.status(200).json(project);
        })
        .catch(error => {
          res.status(500).json({ message: 'Something went wrong' });
        });
    });


    newProject
      .save()
      .then(projectSaved => {
        return User.findByIdAndUpdate(id, {
          $push: { projects: projectSaved._id },
          new: true
        })
        .then(_ => res.status(200).json(projectSaved._id))
        .catch(error => {
          res.status(500).json({ message: 'Error updating user', error });
        });
      })
      .catch(error => {
        res.status(500).json({ message: 'Error saving new Project', error });
      });
  });
});



router.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {

    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});


router.put("/edit/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndUpdate(
    id,
    {
      activeProject: req.body.path
    },
    { new: true }
  ).then(userUpdated => {
    res.status(200).json(userUpdated);
  })
  .catch(err => res.json(err))
});

router.put("/edit/addProject/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndUpdate(
    id,
    {
      activeProject:  req.body.path
    },
    { new: true }
  ).then(userUpdated => {
    res.status(200).json(userUpdated);
  })
  .catch(err => res.json(err))
});

router.post('/upload', uploader.single('picture'), (req, res) => {
  if(req.file){
    res.status(200).json({secure_url: req.file.secure_url })
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
})

module.exports = router;
