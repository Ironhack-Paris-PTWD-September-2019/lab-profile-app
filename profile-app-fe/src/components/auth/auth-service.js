import axios from "axios";

const errorHandler = err => {
  // console.error(err);
  throw err;
};

class AuthServices {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true
    });
  }

  signup = (username, password, campus, course) => {
    return this.service
      .post("/auth/signup", { username, password, campus, course })
      .then(response => response.data);
  };

  login = (username, password) => {
    return this.service
      .post("/auth/login", { username, password })
      .then(response => response.data);
  };

  loggedin = () => {
    return this.service.get("/auth/loggedin").then(response => response.data);
  };

  logout = () => {
    return this.service
      .post("/auth/logout", {})
      .then(response => response.data);
  };

  edit = (username, campus, course) => {
    return this.service
      .put("/auth/edit", { username, campus, course })
      .then(response => response.data);
  };

  //saves the secure URL in user and returns updated user
  handleUploadFile = theFile => {
    // console.log('file in service: ', theFile)
    return this.service
      .post("/upload", theFile)
      .then(res => res.data)
      .catch(errorHandler);
  };
}

export default AuthServices;
