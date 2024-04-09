import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      orderHistory: []
    };
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    axios.get(`https://fullstack-backend-0bbh.onrender.com/api/users/get?userName=${username}`)
      .then(response => {
        const userData = response.data[0];
        this.setState({ userData });
        this.fetchOrderHistory(userData._id);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }

  fetchOrderHistory = (userId) => {
    axios.get(`https://fullstack-backend-0bbh.onrender.com/api/users/getOrderHistory/${userId}`)
      .then(response => {
        const orderHistory = response.data;
        this.setState({ orderHistory });
      })
      .catch(error => {
        console.error('Error fetching order history:', error);
      });
  };

  handleLogOut = () => {
    localStorage.removeItem('username');
    this.props.onLogout();
  };

  render() {
    const { userData, orderHistory } = this.state;

    if (Object.keys(userData).length === 0 || orderHistory.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div className="user-container">
        <div className="user-content">
          <h2>Welcome {userData.userName} to Classical Board Games Collection</h2>
          <h3>Order History:</h3>
          <ul>
            {orderHistory.map((order, index) => (
              <li key={order._id}>
                <p>Item: {order.itemName}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Timestamp: {order.timestamp}</p>
              </li>
            ))}
          </ul>
          <Link to={`/signup`}>
            <button className="logout-button" onClick={this.handleLogOut}>Log Out</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default User;
