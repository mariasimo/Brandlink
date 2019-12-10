// // Seeds file that remove all users and create 2 new users

// // To execute this seed, run from the root of the project
// // $ node bin/seeds.js


const mongoose = require('mongoose');
const Users = require('../models/User')
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

require('../configs/db.config')

const users = [
    {
        username : "Pedro",
        password : "123",
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
        Users
            .insertMany(users)
            .then(dbSeed => {
                console.log({ alert: 'Database was seed' }, dbSeed)
            })
            .catch(err => {
                console.log(err)
            })
    })


// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const User = require("../models/User");

// const bcryptSalt = 10;

// mongoose
//   .connect('mongodb://localhost/server', {useNewUrlParser: true})
//   .then(x => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err)
//   });

// let users = [
//   {
//     username: "alice",
//     password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
//   },
//   {
//     username: "bob",
//     password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
//   }
// ]

// User.deleteMany()
// .then(() => {
//   return User.create(users)
// })
// .then(usersCreated => {
//   console.log(`${usersCreated.length} users created with the following id:`);
//   console.log(usersCreated.map(u => u._id));
// })
// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })