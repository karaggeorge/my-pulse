import React, { Component } from 'react';

class Home extends Component {
  componentWillMount() {
    console.log(window.location.search);
  }

  render() {
    console.log('render');
    return (
      <div>
        <h1>Hello Home</h1>
      </div>
    );
  }
}

export default Home;
