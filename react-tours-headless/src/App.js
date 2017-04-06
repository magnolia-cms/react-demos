import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom'

import axios from 'axios';
import './App.css';

import TourDetail from './TourDetail.js';
import FilterBar from './FilterBar.js';

//const URL = "http://localhost:8080/tours-endpoint.js"
//const URL = "/tours-for-testing.json"
const URL = window.MAGNOLIA_TOURS_URL;

const About = () => (
  <div>
    <h2>About</h2>
    <p>A React app connected to a Magnolia server.</p>
  </div>
)

class App extends Component {

  serverRequest = {};

  constructor(props) {
    super(props);
    this.state = {
      tours: [],
      tourTypes: [],
      destinations: [],
      loaded: false
    };
  }

  componentDidMount() {
    var _this = this;

    // Get data from CMS and set 'loaded=true' when complete.

    if (window.MAGNOLIA_TOURS &&
        window.MAGNOLIA_DESTINATIONS &&
        window.MAGNOLIA_TOURTYPES
    ){
      // Magnolia has supplied the data directly in the page.
      console.log("Has inline data.")

      _this.setState({
        tours: window.MAGNOLIA_TOURS,
        destinations: window.MAGNOLIA_DESTINATIONS,
        tourTypes: window.MAGNOLIA_TOURTYPES,
        loaded: true
      });

    }else{
      // Headless - retrieve data via REST.
      console.log("Must retrieve data.")

      // Sending superuser for demo purposes
      // For actual project you would probably simply ensure the anonymous user in Magnolia has proper rights.
      const requestConfig = {
        auth: {
          username: 'superuser',
          password: 'superuser'
        }
      }

      this.serverRequest =
        axios.all([
          axios.get(URL, requestConfig),
          axios.get(URL + '?destinations=true', requestConfig),
          axios.get(URL + '?tour-types=true', requestConfig)
        ])
        .then(axios.spread(function (tours, destinations, tourTypes) {
          _this.setState({
            tours: tours.data,
            destinations: destinations.data,
            tourTypes: tourTypes.data,
            loaded: true
          });
          console.log("App:serverRequest: Got all files.")
        }))
    }

  }

  componentWillUnmount() {
    if (this.serverRequest){
      //axios - this.serverRequest.abort();
    }
  }


  render() {
    const logoReactUrl = window.PUBLIC_URL + "/logo.svg"
    const logoMagnoliaUrl = window.PUBLIC_URL + "/logo-magnolia.svg"

    if (this.state.loaded === false){
      return (<div>NOT LOADED.</div>)

    }else{

      return (
      <HashRouter>
        <div className="App">

          <div className="App-header">
            <div className="App-logos">
              <img src={logoReactUrl} className="App-logo" alt="React Logo" />
              <img src={logoMagnoliaUrl} className="App-logo" alt="Magnolia Logo" />
            </div>

            <h3>{window.MAGNOLIA_HEADER}</h3>
            <p>{window.MAGNOLIA_HEADER_ABSTRACT}</p>
          </div>

          <Route exact path="/" render={() =>
              <FilterableTourList
                tours={this.state.tours}
                destinations={this.state.destinations}
                tourTypes={this.state.tourTypes}
                />
            }
          />
          <Route path="/about" component={About}/>
          <Route path={"/tourDetail/:tourName"} render={({match}) =>
              <TourDetail tours={this.state.tours} tourName={match.params.tourName}/>
            }
          />
        </div>

      </HashRouter>
    );
  }
  }
}




class FilterableTourList extends Component {

  constructor(props) {
    console.log("Construct FilterableTourList")

    super(props);
    this.state = {
      filterText: '',
      destination: '',
      tourType: ''
    };

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleTourTypeChange = this.handleTourTypeChange.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  handleDestinationChange(destination) {
    console.log("App:Dest=" + destination)
    this.setState({
      destination: destination
    });
  }
  handleTourTypeChange(tourType) {
    this.setState({
      tourType: tourType
    });
  }

  render() {
    return (
      <div>
        <h1>Find Your Tour</h1>

        <FilterBar
          destinations={this.props.destinations}
          tourTypes={this.props.tourTypes}

          filterText={this.state.filterText}
          destination={this.state.destination}
          tourType={this.state.tourType}

          onFilterTextInput={this.handleFilterTextInput}
          onDestinationChange={this.handleDestinationChange}
          onTourTypeChange={this.handleTourTypeChange}
        />

      <TourList
        tours={this.props.tours}
        tourTypes={this.props.tourTypes}

          filterText={this.state.filterText}
          destination={this.state.destination}
          tourType={this.state.tourType}
        />
      </div>
    );
  }
}


class TourList extends Component {

  constructor(props) {
    console.log("Construct TourList")
    super(props);
    this.isFilterMatch = this.isFilterMatch.bind(this)
  }

  isFilterMatch(tour) {
    const isSearchMatch = (tour.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1)
    const isDestinationMatch = tour.destination.includes(this.props.destination) || this.props.destination===''
    const isTourTypeMatch = tour.tourTypes.includes(this.props.tourType) || this.props.tourType===''
    return (isSearchMatch && isDestinationMatch && isTourTypeMatch)
  }

  render() {

    const filteredTours = this.props.tours.filter(this.isFilterMatch);

    return (
      <div>
        <div className="tour-count">{filteredTours.length} matching tours.</div>
        {filteredTours.map( (tour) =>
          <Tour key={tour.name} tour={tour}  tourTypes={this.props.tourTypes} />
        )}
      </div>
    )
  }
}


class Tour extends React.Component {

  render() {

    const imgStyle = {
      backgroundImage: 'url(' + window.MAGNOLIA_BASE_URL_IMAGE + this.props.tour.image['@rendition_480'] + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    return (
      <div className="App-tour">
        <Link to={"tourDetail/" + this.props.tour["@name"]}>
          <div className="App-tour-img" style={imgStyle}>
          <div className="App-tour-text">{this.props.tour.name}</div>
          </div>
        </Link>

      </div>
    )
  }
}

export default App;
