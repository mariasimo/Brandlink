# Brandlink

Brandlink is my final project at Ironhack bootcamp. It is an SPA where designers can **sign up, create projects containing the brand guidelines and share them** with their clients.

The aim is to offer designers a tool to present their work in a centralized, maintainable and and always up-to-date manner.
Built with React + Express.

<p align="center"><img src="https://raw.githubusercontent.com/mariasimo/Brandlink/master/screenshots/image.png" alt="Brandlink" width="600"/></p>


🚧

#### Warning

This project is now under active refactoring under the branch `develop`.
I'm working on it! 👷🏻‍♀️

**Current changelog**

- [x] Passing from class syntax to function + hooks

- [x] Use context api for authentication and project state

- [ ] Refactor styles from Bulma to good old vanilla css

- [ ] Upgrade design

- [ ] Add responsive styles

- [ ] Add animations to key elements and/or page transitions




📁

#### Download the project

```
git clone https://github.com/mariasimo/Brandlink.git

```


⚙️

#### Config the project

You'll need to install dependencies. Run command:

```
npm install
```


Project is divided in two main folders. Client and Server.
In order to start the project, you have to create two .env files.

Client side .env:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_URL=http://localhost:3000
REACT_APP_GFONTS_KEY=<google-fonts-api-token>
```

Server side .env:

```
PORT=5000
ENV=development
DBD=<database-development>
DBP=<database-production>

CLOUD_NAME=<cloudinary-name>
CLOUD_KEY=<cloudinary-key>
CLOUD_SECRET=<cloudinary-secret>
```



🚀

#### Run the project

First, start the **server** with one of these commands:

```
npm run dev
```



And then, start **client** with command:

```
npm start
```

Ta-da! The project will run on http://localhost:3000




 🏗

#### Built with

- MongoDB & Mongoose — https://www.mongodb.com/
- Node js — https://github.com/nodejs/node
- Express — https://github.com/expressjs/express
- Nodemailer — https://www.npmjs.com/package/nodemailer
- React (create-react-app) — https://github.com/facebook/react
- Sass — https://github.com/sass/node-sass
-  Axios — https://github.com/axios/axios




✌🏽

#### Contributions and feedback

This project is made for the only purpose of learning.
Please feel free to use this repo for your own evil plans. Any comments, feedback or contributions will be very much appreciated
