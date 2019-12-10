import axios from 'axios';

class AuthService {
  constructor() {
    this.instance = axios.create({
      baseURL: `http://localhost:5000/api`,
      withCredentials: true    
    })
  }

  signup = (user) => {
    return this.instance.post('/signup', user)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  login = (user) => {
    return this.instance.post('/login', user)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  loggedInUser = () => {
    return this.instance.get('/loggedin')
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  upload = (picture) => {
    return this.instance.post('/upload', picture)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }
}

export default AuthService