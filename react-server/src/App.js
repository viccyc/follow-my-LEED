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
      redirect: false
    };
    this.handleSearch = this.handleSearch.bind(this);
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

  render() {
    const NavFormComponent = () => {
      if (this.state.address) {
        return (<NavForm address={this.state.address} handleSearch={this.handleSearch} />);
      }
    };

    if (this.state.redirect) {
      return (
        <div>
          <nav>
            <Link to="/find_score" style={{ textDecoration: 'none' }}><MenuItem title='CALCULATE SCORE'/></Link>
            <Link to="/find_score" style={{ textDecoration: 'none' }}><MenuItem title='SHOW PROJECTS'/></Link>
            {NavFormComponent()}
          </nav>
          <Score address={this.state.address} />
        </div>
      )
    } else {
      return (
        <div>
          <nav>
            <Link to="/find_score" style={{ textDecoration: 'none' }}><MenuItem title='CALCULATE SCORE'/></Link>
            <Link to="/find_score" style={{ textDecoration: 'none' }}><MenuItem title='SHOW PROJECTS'/></Link>
            {NavFormComponent()}
          </nav>
          <div>
            <Switch>
              <Route exact path='/' render={(props) => <Home {...props} handleSearch={ this.handleSearch } />} />
              <Route path='/find_score' render={(props) => <Score {...props} address={this.state.address} handleSearch={ this.handleSearch }/>} />
              <Route path='/projects' render={(props) => <Projects {...props} address={this.state.address} handleSearch={ this.handleSearch } />} />
              <Route component={NoMatch}/>
            </Switch>
          </div>
        </div>
      )
    }
  }
}

export default withRouter(App);