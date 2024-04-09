import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component {
  render() {
    const { cartItems, updateCartItemQuantity, removeFromCart } = this.props;

    const calculateTotalPrice = () => {
      let totalPrice = 0;
      cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
      });
      return totalPrice.toFixed(2);
    };

    return (
      <div className="cart-container">
      <div className="cart">
        <h2>Shopping Cart</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price} <br />
              Quantity: 
              <input
                type="number"
                value={item.quantity}
                onChange={e => updateCartItemQuantity(item.name, parseInt(e.target.value))}
              />
              <button onClick={() => removeFromCart(item.name)}>Remove</button>
            </li>
          ))}
        </ul>
        <div>
          Total Price: ${calculateTotalPrice()}
        </div>

        <Link to={{ pathname: "/checkout", state: { cartItems } }}>
          <button>Make Order</button>
        </Link>
      </div>
      </div>
    );
  }
}

export default Cart;
