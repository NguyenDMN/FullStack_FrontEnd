import React, { Component } from 'react';
import { Link,Navigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      address: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { userName, password, address } = this.state;

    // Send POST request to backend
    axios.post('https://fullstack-backend-0bbh.onrender.com/api/users/addUser', { userName, password, address })
      .then(res => {
        console.log(res.data);
        // Handle success, such as redirecting to another page
        // Handle success
        alert('Successfully created account!');
      // Clear the form inputs
      this.setState({
        userName: '',
        password: '',
        address: '',
        redirectToHome: true
        });
      })
      .catch(error => {
        console.error('Error adding user:', error);
        // Handle error
      });
  };

  render() {
    const { userName, password, address,redirectToHome } = this.state;
    if (redirectToHome) {
      return <Navigate to="/" />; // Redirect to the homepage
    }
    return (
      <div className="main-content Login">
        <h2>CBGC Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <label>User ID</label>
          <br/>
          <input type='text' name='userName' value={this.state.userName} onChange={this.handleChange}/>
          <br/>
          <label>Password</label>
          <br/>
          <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
          <br/>
          <label>Address</label>
          <br/>
          <input type='text' name='address' value={this.state.address} onChange={this.handleChange}/>
          <br/>
          <button type="submit">Create an account</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
