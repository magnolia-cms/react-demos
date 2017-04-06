import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class TourDetail extends Component {

  createMarkup(toOutput) {
    return {__html: toOutput};
  }
  render() {
    const find = (id) => this.props.tours.find(p => p["@name"] === id)
    const tour = find(this.props.tourName)

    const imgStyle = {
      backgroundImage: 'url(' + window.MAGNOLIA_BASE_URL_IMAGE + tour.image['@link'] + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }


    return (

      <div className="tour-detail">
        <Link className="tour-detail-home" to={"/"}>
          &laquo; Return to<br/>
          &nbsp; Tours List
        </Link>

        <h3>{tour.name}</h3>
        <p>{tour.description}</p>

        <div className="tour-detail-img" style={imgStyle}></div>
        <div className="tour-detail-body" dangerouslySetInnerHTML={this.createMarkup(tour.body)} ></div>
      </div>
    )
  }
}

export default TourDetail;
