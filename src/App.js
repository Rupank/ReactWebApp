import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import InfiniteScroller from './components/ScrollerHooks';
import AboutPage from './components/About';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <div className="App"> 
        <Nav />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/scroll" component={InfiniteScroller}></Route>
          <Route exact path="/about" component={AboutPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
