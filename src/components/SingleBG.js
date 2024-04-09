import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleBG = ({ boardgames, addToCart }) => {
  // Extracting the board game id from the URL
  const { id } = useParams();

  // Finding the board game with the matching id
  const selectedBoardGame = boardgames.find(boardgame => boardgame._id === id);

  if (!selectedBoardGame) {
    return <div>Board game not found!</div>;
  }

  const handleAddToCart = () => {
    addToCart(selectedBoardGame.Name, selectedBoardGame.Price);
  };

  return (
    <div className="SingleBGContainer">
      <h2>{selectedBoardGame.Name}</h2>
      <div>
        <img src={selectedBoardGame.ImgUrl} alt={selectedBoardGame.Name}/>
        <p>${selectedBoardGame.Price}</p>
        <p>Players: {selectedBoardGame.MinPlayer} - {selectedBoardGame.MaxPlayer}</p>
        <p>In stock: {selectedBoardGame.InStock} units</p>
        <p>{selectedBoardGame.Descr}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default SingleBG;
