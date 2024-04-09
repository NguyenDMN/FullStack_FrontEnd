import React, { Component } from 'react';
import { Link,Navigate } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '', // Change userId to username
      password: ''
    };
  }
  

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSignIn = async () => {
    const { userName, password } = this.state; // Change userId to username
    try {
      // Send a POST request with user credentials to the server
      const response = await axios.post('https://fullstack-backend-0bbh.onrender.com/api/users/login', { userName, password }); // Change userId to username
      // Check if the response indicates successful authentication
      if (response.data.success) {
        localStorage.setItem('username', userName);
        
        // Update parent component's state to track user authentication status and username
        this.props.onLogin(userName);

        this.setState({ redirectToHome: true });
      } else {
        // Display error message if authentication fails
        alert('Invalid username or password!');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      alert('An error occurred while signing in. Please try again later.');
    }
  }

  render() {
    const { userName, password, redirectToHome} = this.state;

    if (redirectToHome) {
      return <Navigate to="/" />; // Redirect to the homepage
    }

    return (
      <div className="main-content Login">
        <h2>CBGC Sign in</h2>
        <label>User ID:</label>
        <input type='text' name="userName" value={this.state.userName} onChange={this.handleInputChange} /> {/* Change userId to username */}
        <br />

        <label>Password:</label>
        <input type='password' name="password" value={this.state.password} onChange={this.handleInputChange} />
        <br />

        <button onClick={this.handleSignIn}>Sign In</button>

        <Link to={`/signup`}>
          <button>Sign Up</button>
        </Link>
      </div>
    );
  }
}

export default Login;
