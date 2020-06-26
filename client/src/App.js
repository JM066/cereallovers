import React from 'react';
// import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import './App.css';
import UsersByCereals from './components/UsersByCereals'
// import { json } from 'express';

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state= {
        cereals: "",
        usersByCerealsShowing: false
      }
  }


  getCerealName(e) {
    // console.log(e.target.alt)
    e.preventDefault();
    this.setState({
      cereals: e.target.alt
    })
  }
  toggleHandle(e) {
    this.setState({
      usersByCerealsShowing: true
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Meet Other Cheerios?</h1>
        <img src="https://www.japonshop.com/med/img/productos/prd-cereales-froot-loops-japonshop.webp" 
             className="cereal-img" alt="1"
             onClick={e => this.getCerealName(e)}>
        </img>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTz7kwbkCfcqEU-YdUvYODeqMSJmHLftiWnvA&usqp=CAU" 
             className="cereal-img" alt="2"
             onClick={e => this.getCerealName(e)}>
        </img>
        <div>
          <button onClick={e => this.toggleHandle(e)}>Show users</button>
          {this.state.usersByCerealsShowing ?  <UsersByCereals cerealData={this.state.cereals} /> : null}
          <ul>
          {/* {this.state.usersByCereals.map((user, index) => {
            return (
            <li key={index}>{user.name}</li>
            )
          })} */}
          </ul>
        </div>

      </div>
    );
  }
  
}

export default App;
