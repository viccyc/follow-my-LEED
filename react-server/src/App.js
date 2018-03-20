import React, { Component } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';

import NavForm from './NavForm';
import Home from './Home';
import Score from './Score';
import Projects from './Projects';
import NoMatch from './NoMatch';

import './Nav.css';
import './NavForm.css';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      redirect: false,
      // services: {},
      // scoreTable: {
      //   'street_network': null,
      //   'community_resources': null,
      //   'access_to_transit': null
      // },
      // area: null,
      // criteriaClicked: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    // this.handleScoreTableClick = this.handleScoreTableClick.bind(this);
    // this.setMapData = this.setMapData.bind(this);
  }
            
  handleSearch(address, pathname) {
    if (pathname === '/') {
      // this.props.history.push({
      //   pathname: "/find_score",
      //   search: "?address=",
      //   state: { address: address }
      // });
      this.setState({ address: address, redirect: true });
    } else {
      this.setState({ address: address });
    }
  }

  // handleScoreTableClick(value) {
  //   let criteriaClicked = this.state.criteriaClicked;
  //   if (criteriaClicked.includes(value)) {
  //     criteriaClicked = criteriaClicked.filter(criterion => criterion !== value);
  //   } else {
  //     criteriaClicked.push(value);
  //   }
  //   this.setState({ criteriaClicked: criteriaClicked });
  // }

  // setMapData(newState) {
  //   this.setState(newState);
  // }

  // setScoreTableData(data) {
  //   const oldScoreTable = this.state.scoreTable;
  //   // const keys = Object.keys(oldScoreTable);
  //   for (let keys in oldScoreTable){
  //     if (keys === 
  //   }
  //   this.state.scoreTable[]
  // }

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
          <nav id="navbar" className="navbar navbar">
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
          <nav id="navbar" className="navbar navbar">
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