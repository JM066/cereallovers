import React from 'react';

class UsersByCereals extends React.Component {
  constructor(props) {
    super(props);
      this.state= {
        usersByCereals: []
      }
  }
  componentDidMount() {
    this.getUsersByCereals(this.props.cerealData);
  }
  getUsersByCereals = id => {
    fetch(`/users/${id}`)
     .then(res => res.json())
     .then(jsonData => {
       console.log(jsonData)
       this.setState({
         usersByCereals: jsonData
       });
     });
  };
  render() {
    return(
        <div>
          <ul>
            {this.state.usersByCereals.map((user, index) => {
              <li id={index}>{user.name}</li>
            })}
          </ul>
        </div>
    )
  }
}

export default UsersByCereals;