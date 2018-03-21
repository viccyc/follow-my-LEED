import axios from 'axios';
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

  componentDidMount() {
    console.log(this.props.location.search);
    if (!this.state.address && this.props.location.search) {
      console.log('in componentwillmount')
      const search = this.props.location.search;
      const params = new URLSearchParams(search);
      const address_id = params.get('address_id');

      // const map = new window.google.maps.Map();
      // const placesService = new window.google.maps.places.PlacesService(map);
      // placesService.getDetails(
      //     { placeId: address_id },
      //     function(results, status) {
      //       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      //         console.log(status);
      //         console.log(results); 
      //       }
      //     }
      // );
      // console.log(address_id);
  
      axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${address_id}&key=AIzaSyCVUNahj_Lx06vet-sGaPLHBs0svgXwX98`)
        .then(results => {
          console.log(results);
          const data = results.data.result;
          console.log(data);
          if (data.formatted_address) {
            const address = {
              id: data.place_id,
              name: data.formatted_address,
              lat: parseFloat(data.geometry.location.lat.toFixed(7)),
              lng: parseFloat(data.geometry.location.lng.toFixed(7))
            }
            console.log(address);
            this.setState({ address });
          }
        });
    }
  }
            
  handleSearch(address, pathname) {
    if (pathname === '/') {
      this.setState({ address: address });
      this.props.history.push({
        pathname: "/find_score",
        search: `?address_id=${address.id}`,
      });
    } else {
      this.setState({ address: address });
      this.props.history.push({
        pathname: pathname,
        search: `?address_id=${address.id}`,
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return (
        <div>
          <nav id="navbar" className="navbar navbar">
            <div>
              <Link to={{ pathname: "/find_score", search: `?address_id=${this.state.address.id}` }} style={{ textDecoration: "none" }}><button className="btn btn-outline-success">CALCULATE SCORE</button></Link>
              <Link to={{ pathname: "/projects", search: `?address_id=${this.state.address.id}`}} style={{ textDecoration: "none" }}><button className="btn btn-outline-success">SHOW PROJECTS</button></Link>
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
              <Link to="/find_score" style={{ textDecoration: "none" }}><button className="btn btn-outline-success">CALCULATE SCORE</button></Link>
              <Link to="/projects" style={{ textDecoration: "none" }}><button className="btn btn-outline-success">SHOW PROJECTS</button></Link>
            </div>
          </nav>
          <div>
              <Route path='/' render={(props) => <Home {...props} handleSearch={ this.handleSearch } search={props.match.params.search} />} />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <nav id="navbar" className="navbar">
            <div>
              <Link to={{ pathname: "/find_score", search: `?address_id=${this.state.address.id}`}} style={{ textDecoration: "none" }}><button className="btn btn-outline-success">CALCULATE SCORE</button></Link>
              <Link to={{ pathname: "/projects", search: `?address_id=${this.state.address.id}`}} style={{ textDecoration: "none" }}><button className="btn btn-outline-success">SHOW PROJECTS</button></Link>
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

{/* <nav class="navbar navbar-light bg-light">
  <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
</nav> */}

{/* <Link to="/find_score" id="navbar-link1" className="nav-link" style={{ textDecoration: "none" }}>CALCULATE SCORE</Link>
<Link to="/projects" id="navbar-link2" className="nav-link" style={{ textDecoration: "none" }}>SHOW PROJECTS</Link> */}

{/* <Route path='/find_score' render={(props) => <Score {...props} search={props.match.params.search} />} />
<Route path='/projects' render={(props) => <Projects {...props} search={props.match.params.search} />} /> */}