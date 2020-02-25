import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3000/api',
      withCredentials: true
    });
  }

  signup = (username, password, campus, course) => {
    return this.service.post('/signup', {username, password, campus, course})
      .then(response => response.data)
  }

  // loggedin = () => {
  //   return this.service.get('/loggedin').then(response => response.data)
  // }

}




export default AuthService;