// // Seeds file that remove all users and create 2 new users

// // To execute this seed, run from the root of the project
// // $ node bin/seeds.js


const mongoose = require('mongoose');
const Users = require('../models/User')
const Projects = require('../models/Project')
const bcrypt = require('bcrypt');
const bcryptSalt = 10;


require('../configs/db.config')


const users = [
    {
        username : "Pedro",
        password : "123",
        projects : projectsIDs
    },
    {
        username: "Alex",
        password: "123",
    },
    {
        username: "Carmen",
        password: "123",
    },
    {
        username: "Julio",
        password: "123",
    },
    {
        username: "Ana",
        password: "123",
    },
    {
        username: "Juan",
        password: "123",
    },
    {
        username: "Carla",
        password: "123",
    }
]

//   Hash password before insert in db
users.map(user => {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(user.password, salt);

    user.password = hashPass;
})


Users
    .deleteMany()
    .then(() => {

    })
    .then(() => {
        Users
        .insertMany(users)
        .then(dbSeed => {
            console.log({ alert: 'Database was seed' }, dbSeed)
        })
        .catch(err => {
            console.log(err)
        })
    })

