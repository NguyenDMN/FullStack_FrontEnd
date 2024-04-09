import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { Link } from 'react-router-dom';

// Star icon component
const StarIcon = ({ filled }) => {
  return (
    <span style={{ color: filled ? 'gold' : 'lightgray' }}>
      {filled ? <i className="fas fa-star"></i> : <i className="far fa-star"></i>}
    </span>
  );
};

class AllBG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: 12,
    };
  }

  // Function to handle page change
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { boardgames, addToCart } = this.props;
    const { currentPage, itemsPerPage } = this.state;

    // Calculate indexes of items to be displayed on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = boardgames.slice(indexOfFirstItem, indexOfLastItem);

    // Render board game items for the current page
    const renderedItems = currentItems.map((boardgame, index) => (
      <div key={index} className="displayBG">
        <Link to={`/gameinfo/${boardgame._id}`}>
          <img src={boardgame.ImgUrl} alt={boardgame.Name} />
        </Link>
        <p>{boardgame.Name}</p>
        <p>${boardgame.Price}</p>
        <div>
          Rating: {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} filled={i < boardgame.Rating} />
          ))}
          - Reviews({boardgame.NumOfReviews})
        </div>
        <button onClick={() => addToCart(boardgame.Name, boardgame.Price)}>Add to Cart</button>
      </div>
    ));

    // Calculate total number of pages
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(boardgames.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    // Render page number buttons
    const renderPageNumbers = pageNumbers.map((number) => (
      <span
        key={number}
        className={currentPage === number ? 'page-number active' : 'page-number'}
        onClick={() => this.handlePageChange(number)}
      >
        {number}
      </span>
    ));

    return (
      <div className="main-content Login">
        <h2>All In-stock Board Games</h2>
        <div className='boardGameSummary'>
          {renderedItems}
        </div>
        <div className="pagination">
          {renderPageNumbers}
        </div>
      </div>
    );
  }
}

export default AllBG;
