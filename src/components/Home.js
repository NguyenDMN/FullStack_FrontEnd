import React, { Component } from 'react';
import { Link } from 'react-router-dom';

let movingPic = [{
  "_id":"660dd7cf0af46f5ad001ee43",
  "ImgUrl": "https://firebasestorage.googleapis.com/v0/b/fullstackwebproject.appspot.com/o/BG_021.jpg?alt=media&token=c10b7d0b-6ba9-4c69-b69c-1668d17609fc"
},
{
  "_id": "660dd7cf0af46f5ad001ee45",
  "ImgUrl": "https://firebasestorage.googleapis.com/v0/b/fullstackwebproject.appspot.com/o/BG_023.jpg?alt=media&token=f1050b8f-ecc8-475e-a7ee-9af4ace72ace"
}
,{
  "_id": "660dd7cf0af46f5ad001ee2f",
  "ImgUrl": "https://firebasestorage.googleapis.com/v0/b/fullstackwebproject.appspot.com/o/BG_001.jpg?alt=media&token=744550a9-9bf2-4fca-82e4-dc9be74374f7"
}]

class Home extends Component {   
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0
    };
  }
  
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        currentImageIndex: (prevState.currentImageIndex + 1) % movingPic.length
      }));
    }, 2000);
  }

  componentWillUnmount() {
    console.log("Component unmounted");
    clearInterval(this.interval);
  }
  
  render() {
    const { currentImageIndex } = this.state;
    return (
      <div className="main-content home">
        <h2>Welcome to Classical BoardGames Collection</h2>
        <h3>Top 3 most welcomed games:</h3>
        <hr />
        <div className="homemovingpic">
          {movingPic.map((pic, index) => (
            <Link key={index} to={`/gameinfo/${pic._id}` } style={{ display: index === currentImageIndex ? 'block' : 'none' }}>
              <img 
                src={pic.ImgUrl} 
                alt={`Board Game ${index}`}
                  
              />
            </Link>
          ))}
        </div>
        <div className='aboutus'>
          <h2>About Us</h2>
          <p>We are dedicated to reviving and celebrating classical board games from all over the world. Our mission is to bring back the joy and nostalgia of playing traditional board games that have stood the test of time.</p>
          <p>Whether you're a seasoned player or new to the world of board games, our collection offers a wide variety of games for players of all ages and preferences. Join us in rediscovering the timeless appeal of classical board games!</p>
        </div>
      </div>
    );
  }
}

export default Home;
