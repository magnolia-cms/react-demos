import React, { Component } from 'react';

class FilterBar extends Component {

  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleTourTypeChange = this.handleTourTypeChange.bind(this);
  }

  /* Call parents callbacks. */
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  handleDestinationChange(e) {
    console.log("FilterBar:handleDestinationChange")
    this.props.onDestinationChange(e.target.value);
  }

  handleTourTypeChange(e) {
    this.props.onTourTypeChange(e.target.value);
  }

  render() {
    return (
      <form>
        <div className="bar-control">
          <label>Destination</label>
          <select
            value={this.props.destination}
            onChange={this.handleDestinationChange}
            id="destination"
            >
            <option value='' key='all' >Anywhere</option>

            {this.props.destinations.map( (destination) =>
              <option value={destination['@id']} key={destination.displayName} >{destination.displayName}</option>
              )}
          </select>
        </div>

        <div className="bar-control">
          <label>Tour Type</label>
          <select
            value={this.props.tourType}
            onChange={this.handleTourTypeChange}
            id="TourType"
            >
            <option value='' key='all' >Anything</option>

            {this.props.tourTypes.map( (tourType) =>
              <option value={tourType['@id']} key={tourType.displayName} >{tourType.displayName}</option>
            )}
          </select>
        </div>

        <div className="bar-control">
          <label>Search</label>
            <input
              type="text"
              value={this.props.filterText}
              onChange={this.handleFilterTextInputChange}
              id="search"
            />
        </div>

      </form>
    );
  }

}



export default FilterBar;
