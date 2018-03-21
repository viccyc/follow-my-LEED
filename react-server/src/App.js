import React, { Component } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';

import NavForm from './NavForm';
import Home from './Home';
import Score from './Score';
import Projects from './Projects';
import NoMatch from './NoMatch';

import './Nav.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: null,
      redirect: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(address, pathname) {
    if (pathname === '/') {
      this.setState({ address: address });
      this.props.history.push({
        pathname: "/find_score",
        search: `?address=${address.name}`,
        // state: { address: address }
      });
    } else {
      this.setState({ address: address });
      this.props.history.push({
        pathname: pathname,
        search: `?address=${address.name}`,
        // state: { address: address }
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return (
        <div>
          <nav id="navbar" className="navbar navbar">
            <div>
              <Link to="/find_score" id="navbar-link1" className="nav-link" style={{ textDecoration: "none" }}>CALCULATE SCORE</Link>
              <Link to="/projects" id="navbar-link2" className="nav-link" style={{ textDecoration: "none" }}>SHOW PROJECTS</Link>
            </div>
            <NavForm address={this.state.address} handleSearch={this.handleSearch} />
          </nav>
          <Score state={this.state} address={this.state.address} />
        </div>
      )
    } else if (!this.state.address) {
      return (
        <div>
          <nav id="navbar" className="navbar">
            <div>
              <Link to="/find_score" id="navbar-link1" className="nav-link" style={{ textDecoration: "none" }}>CALCULATE SCORE</Link>
              <Link to="/projects" id="navbar-link2" className="nav-link" style={{ textDecoration: "none" }}>SHOW PROJECTS</Link>
            </div>
          </nav>
          <div>
              <Route path='/' render={(props) => <Home {...props} handleSearch={ this.handleSearch } />} />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <nav id="navbar" className="navbar">
            <div>
              <Link to="/find_score" id="navbar-link1" className="nav-link" style={{ textDecoration: "none" }}>CALCULATE SCORE</Link>
              <Link to="/projects" id="navbar-link2" className="nav-link" style={{ textDecoration: "none" }}>SHOW PROJECTS</Link>
            </div>
            <NavForm address={this.state.address} handleSearch={this.handleSearch} />
          </nav>
          <div>
            <Switch>
              <Route exact path='/' render={(props) => <Home {...props} handleSearch={ this.handleSearch } />} />
              <Route path='/find_score' render={(props) => <Score {...props} state={this.state}  address={this.state.address} handleSearch={ this.handleSearch } location={this.props.location} />} />
              <Route path='/projects' render={(props) => <Projects {...props} state={this.state} address={this.state.address} handleSearch={ this.handleSearch } location={this.props.location} />} />
              <Route component={NoMatch}/>
            </Switch>
          </div>
        </div>
      )
    }
  }
}

export default withRouter(App);

<nav class="navbar navbar-light bg-light">
  <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
</nav>
