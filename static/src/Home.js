import React, { Component } from 'react';

class Home extends Component {
  componentWillMount() {
    console.log(window.location.search);
    console.log(toObject(parse(window.location.search.substr(1))));
    const { app, token, err } = toObject(parse(window.location.search.substr(1)));
    if (app === 'ig' && !err) {
      console.log('Sending: ', `exp://exp.host/@karaggeorge/mypulse?token=${token}`);
      window.location = `exp://exp.host/@karaggeorge/mypulse?token=${token}`;
    }
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
