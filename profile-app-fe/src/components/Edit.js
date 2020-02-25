import React from "react";
import AuthServices from "./auth/auth-service";

const Modal = ({ handleClose, show, children }) => {
  return (
    <div className={show ? "modal display-block" : "modal display-none"}>
      <section className="modal-main">
        <button style={{ marginLeft: "auto" }} onClick={handleClose}>
          X
        </button>
        {children}
      </section>
    </div>
  );
};

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:
        (this.props.loggedInUser && this.props.loggedInUser.username) || "",
      campus: (this.props.loggedInUser && this.props.loggedInUser.campus) || "",
      course: (this.props.loggedInUser && this.props.loggedInUser.course) || "",
      image:
        (this.props.loggedInUser && this.props.loggedInUser.image) ||
        "/default-avatar.jpg",
      showModal: false,
      file: ""
    };
    this.service = new AuthServices();
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    this.setState({ file: e.target.files[0] });
  };

  FileUpload = () => {
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("image", this.state.file);
    this.service
      .handleUploadFile(uploadData)
      .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.props.getUser(response);
        this.props.history.push("/profile");
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  submitForm = () => {
    console.log("submitForm");
    const { username, campus, course } = this.state;
    this.service
      .edit(username, campus, course)
      .then(response => {
        console.log(response);
        this.props.getUser(response);
        this.props.history.push("/profile");
      })
      .catch(error => console.log(error));
  };

  componentDidUpdate = () => {
    if (!this.state.username && this.props.loggedInUser) {
      this.setState({
        username: this.props.loggedInUser.username,
        campus: this.props.loggedInUser.campus,
        course: this.props.loggedInUser.course,
        image: this.props.loggedInUser.image || "/default-avatar.jpg"
      });
    }

    console.log(this.props);
  };

  render() {
    return !this.props.loggedInUser ? (
      <div className="main-container signup">
        <div className="left signup-form">Loading ...</div>
      </div>
    ) : (
      <div className="main-container signup">
        <Modal show={this.state.showModal} handleClose={this.hideModal}>
          <div className="avatar">
            <h2>Change avatar</h2>
            <img src={this.state.image} />
            <input type="file" onChange={e => this.handleFileUpload(e)} />
            <button onClick={() => this.FileUpload()}>Upload</button>
          </div>
        </Modal>
        <div className="left signup-form">
          <h1>Edit Profile</h1>
          <div className="form">
            <div className="form-input">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={e => this.handleChange(e)}
              />
            </div>

            <div className="form-input">
              <label>Campus</label>
              <select
                name="campus"
                value={this.state.campus}
                onChange={e => this.handleChange(e)}
              >
                <option value=""></option>
                <option value="Madrid">Madrid</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Miami">Miami</option>
                <option value="Paris">Paris</option>
                <option value="Berlin">Berlin</option>
                <option value="Amsterdam">Amsterdam</option>
                <option value="México">México</option>
                <option value="Sao Paulo">Sao Paulo</option>
              </select>
            </div>

            <div className="form-input">
              <label>Course</label>
              <select
                name="course"
                value={this.state.course}
                onChange={e => this.handleChange(e)}
              >
                <option value=""></option>
                <option value="WebDev">WebDev</option>
                <option value="UX/UI">UX/UI</option>
                <option value="Data Analytics">Data Analytics</option>
              </select>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="avatar">
            <img
              src={this.state.image}
              onClick={this.showModal}
              style={{
                cursor: "pointer",
                border: "3px dashed rgb(99, 129, 101)"
              }}
            />
            <p
              style={{
                cursor: "pointer"
              }}
              onClick={this.showModal}
            >
              Change Picture
            </p>
          </div>
          <div className="create-account">
            <button onClick={this.submitForm}>Submit Changes</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
