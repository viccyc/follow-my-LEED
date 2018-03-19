import React, { Component } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';

import MenuItem from './MenuItem';
import NavForm from './NavForm';
import Home from './Home';
import Score from './Score';
import Projects from './Projects';
import NoMatch from './NoMatch';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      redirect: false,
      services: {},
      area: null,
      criteriaClicked: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleScoreTableClick = this.handleScoreTableClick.bind(this);
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

  handleScoreTableClick(value) {
    let criteriaClicked = this.state.criteriaClicked;
    if (criteriaClicked.includes(value)) {
      criteriaClicked = criteriaClicked.filter(criterion => criterion !== value);
    } else {
      criteriaClicked.push(value);
    }
    this.setState({ criteriaClicked: criteriaClicked });
  }

  render() {
    const NavFormComponent = () => {
      if (this.state.address) {
        return (<NavForm address={this.state.address} handleSearch={this.handleSearch} />);
      }
    };

    if (this.state.redirect) {
      return (
        <div>
          <nav id="navbar" className="navbar navbar">
            <Link to="/find_score" style={{ textDecoration: 'none' }}><MenuItem title='CALCULATE SCORE'/></Link>
            <Link to="/find_score" style={{ textDecoration: 'none' }}><MenuItem title='SHOW PROJECTS'/></Link>
            {NavFormComponent()}
          </nav>
          <Score state={this.state} handleScoreTableClick={this.handleScoreTableClick} />
        </div>
      )
    } else {
      return (
        <div>
          <nav id="navbar" className="navbar navbar">
            <MenuItem />
            {NavFormComponent()}
          </nav>
          <div>
            <Switch>
              <Route exact path='/' render={(props) => <Home {...props} handleSearch={ this.handleSearch } />} />
              <Route path='/find_score' render={(props) => <Score {...props} state={this.state} handleSearch={ this.handleSearch } handleScoreTableClick={this.handleScoreTableClick} location={this.props.location} />} />
              <Route path='/projects' render={(props) => <Projects {...props} state={this.state} handleSearch={ this.handleSearch } location={this.props.location} />} />
              <Route component={NoMatch}/>
            </Switch>
          </div>
        </div>
      )
    }
  }
}

export default withRouter(App);