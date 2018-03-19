import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

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
      tab: 'calculate_leed_score'
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  // componentDidMount() {
  //   this.initAutocomplete();
  // }
  
  // componentDidUpdate(nextProps) {
    //   this.initAutocomplete();
    // }
    
    // shouldComponentUpdate(nextProps, nextState) {
      //   console.log(this.state.autocomplete);
      //   console.log(nextState.autocomplete);
      //   if (this.state.autocomplete && nextState.autocomplete) {
        //     const stateUid = Object.keys(this.state.autocomplete.gm_bindings_.bounds[Object.keys(this.state.autocomplete.gm_bindings_.bounds)[0]])[0];
        //     const nextStateUid = Object.keys(nextState.autocomplete.gm_bindings_.bounds[Object.keys(nextState.autocomplete.gm_bindings_.bounds)[0]])[0];
        //     console.log(stateUid);
        //     console.log(nextStateUid);
        //     if (stateUid === nextStateUid) {
          //       return false;
          //     }
          //   } else {
            //     return true;
            //   }
            // }
            
  handleSearch(address, pathname) {
    if (pathname === '/') {
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
            <Link to="/find_score">CALCULATE LEED SCORE</Link>
            <Link to="/projects">SHOW LEED PROJECTS</Link>
            {NavFormComponent()}
          </nav>
          <Score address={this.state.address} />
        </div>
      )
    } else {
      return (
        <div>
          <nav>
            <Link to="/find_score">CALCULATE LEED SCORE</Link>
            <Link to="/projects">SHOW LEED PROJECTS</Link>
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

export default App;