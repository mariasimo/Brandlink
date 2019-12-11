// // Seeds file that remove all users and create 2 new users

// // To execute this seed, run from the root of the project
// // $ node bin/seeds.js


const mongoose = require('mongoose');
const Projects = require('../models/Project')

require('../configs/db.config')

const projects = [
    {
        title : "Projecto 1",
        path : "/proyecto-uno",
    },
    {
        title : "Projecto 2",
        path : "/proyecto-dos",
    },
    {
        title : "Projecto 3",
        path : "/proyecto-tres",
    },
    {
        title : "Projecto 4",
        path : "/proyecto-cuatro",
    }
]


Projects
    .deleteMany()
    .then(() => {
        Projects
            .insertMany(projects)
            .then(dbSeed => {
                console.log({ alert: 'Database was seed' }, dbSeed)
            })
            .catch(err => {
                console.log(err)
            })
    })

