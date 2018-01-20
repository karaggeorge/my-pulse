import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Privacy from './Privacy';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/privacy' component={Privacy} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const NotFound = () => (
  <div>404 Not Found</div>
)

export default App;
