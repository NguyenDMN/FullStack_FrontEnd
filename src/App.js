
import './App.css';


import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from "./components/Home"
import LoginPage from "./components/Login"
import Header from "./components/Header"
import AllBG from "./components/AllBG"
import SingleBG from "./components/SingleBG"
import Cart from "./components/Cart"
import SignUp from "./components/SignUp"
import Checkout from './components/Checkout';
import User from './components/User';

;


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const [boardgames, setBoardgames] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userInfors, setUserInfors] = useState([]);

  useEffect(() => {
    axios
      .get('https://fullstack-backend-0bbh.onrender.com/api/getboardgames')
      .then((response)=>{
        setBoardgames(response.data)
        // console.log(response.data)
      })
    
  }, []);

  useEffect(() => {
    axios
      .get('https://fullstack-backend-0bbh.onrender.com/api/users/get')
      .then((response)=>{
        setUserInfors(response.data)
        console.log(response.data)
      })
    
  }, []);
  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('username');
  };

  const updateCartItemQuantity = (itemName, quantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.name === itemName) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };



  const addToCart = (name, price) => {
    const existingItemIndex = cartItems.findIndex(item => item.name === name);
    if (existingItemIndex !== -1) {
      // If item already exists in cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      // If item is not in cart, add it
      setCartItems([...cartItems, { name, price, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemName) => {
    const updatedCartItems = cartItems.filter(item => item.name !== itemName);
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };
  

  return (
    <div className="AppContainer">
        <Header isLoggedIn={isLoggedIn} username={username}/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage userInfors={userInfors} onLogin={handleLogin}/>} />
          <Route path="/allboardgames" element={<AllBG boardgames={boardgames} addToCart={addToCart}/>} />
          <Route path="/gameinfo/:id" element={<SingleBG boardgames={boardgames} addToCart={addToCart}/>} />
          <Route path="/cart" element={<Cart cartItems={cartItems} updateCartItemQuantity={updateCartItemQuantity} removeFromCart={removeFromCart}/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart}/>} />
          <Route path='/user' element={<User onLogout={handleLogout}/>}/>
        </Routes>
    </div>
  );
}

export default App;
