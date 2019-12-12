// // Seeds file that remove all users and create 2 new users

// // To execute this seed, run from the root of the project
// // $ node bin/seeds.js

const mongoose = require("mongoose");
const Users = require("../models/User");
const Projects = require("../models/Project");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

require("../configs/db.config");

const projects = [
  {
    title: "Projecto 1",
    path: "proyecto-uno",
    colorPalette: [],
    typeset: []
  },
  {
    title: "Projecto 2",
    path: "proyecto-dos",
    colorPalette: [],
    typeset: []
  },
  {
    title: "Projecto 3",
    path: "proyecto-tres",
    colorPalette: [],
    typeset: []
  },
  {
    title: "Projecto 4",
    path: "proyecto-cuatro",
    colorPalette: [],
    typeset: []
  }
];

const users = [
  {
    username: "Pedro",
    password: "123",
    projects: []
  },
  {
    username: "Ana",
    password: "123",
    projects: []

  }
//   {
//     username: "Carmen",
//     password: "123",
//     projects: []

//   },
//   {
//     username: "Julio",
//     password: "123",
//     projects: []

//   },
//   {
//     username: "Ana",
//     password: "123",
//     projects: []

//   },
//   {
//     username: "Juan",
//     password: "123",
//     projects: []

//   },
//   {
//     username: "Carla",
//     password: "123",
//     projects: []

//   }
];

//   Hash password before insert in db
users.map(user => {
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(user.password, salt);

  user.password = hashPass;
})

let projectsArr = [];


Projects.deleteMany()
.then(() => {
    return Projects.create(projects)
})
.then(projectsCreated => {

    projectsCreated.forEach(project => {
        projectsArr.push(project._id)
    })

    return Users.deleteMany()
})
.then(() => {

    return  Users.create(users)
})
.then(usersCreated => {

    let projectsForUser;

    usersCreated.forEach(user => {
        // This assing two projects form original array to every user
        projectsArr = projectsArr.sort(() => 0.5 - Math.random())
        projectsForUser = projectsArr.slice(0, 2)

        projectsForUser.forEach(projectU => {
            projectsArr = projectsArr.filter(projectA => projectA !== projectU)
        })

        // console.log(`User ${user.username} has created projects ${projectsForUser}`)
        // console.log(`These are the projects that remain to be assigned ${projectsArr}`)

        Users.findByIdAndUpdate(user._id, {
            $push: {projects: projectsForUser}
        })
        .then(payload => {
            console.log("Database was seed")
            console.log(payload)
            process.exit(0)
        })
        .catch(err => console.log(err))
    })
})


