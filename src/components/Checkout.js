import React, { Component } from 'react';
import axios from 'axios';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '', // Name retrieved from user data
      address: '', // Address retrieved from user data
      userId: '' // User ID retrieved from the backend
    };
  }

  componentDidMount() {
    // Retrieve user data based on username
    const username = localStorage.getItem('username'); 
    axios.get(`https://fullstack-backend-0bbh.onrender.com/api/users/get?userName=${username}`)
      .then(response => {
        const userData = response.data[0];
        this.setState({
          userName: userData.userName,
          address: userData.address,
          userId: userData._id
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }

  handleConfirmOrder = async () => {
    const { cartItems } = this.props;
    const { userId } = this.state;
  
    try {
      // Generate timestamp for the order
      const timestamp = new Date();
  
      // Create order items with timestamp
      const orderItems = cartItems.map(item => ({
        itemName: item.name,
        quantity: item.quantity,
        timestamp: timestamp
      }));
  
      // Call the API endpoint to add order history
      await axios.post('https://fullstack-backend-0bbh.onrender.com/api/users/addOrderHistory', {
        userId,
        orderItems
      });

      this.props.clearCart();
  
      // After successfully confirming the order, you may want to navigate to a success page or perform other actions.
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  render() {
    const { userName, address } = this.state;
    const { cartItems } = this.props;
    return (
        <div className="checkout-container">
      <div className="checkout">
        <h2>Checkout</h2>
        <h3>Summary order detail:</h3>
        <ul>
          {cartItems && cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
        <h3>Shipping to:</h3>
        <form>
          <label>Name:</label>
          <input type="text" value={userName} disabled />
          <br />
          <label>Address:</label>
          <input type="text" value={address} disabled />
          <br />
          {/* Add other input fields for checkout */}
          <button type="submit" onClick={this.handleConfirmOrder}>Confirm Order</button>
        </form>
      </div>
      </div>
    );
  }
}

export default Checkout;
