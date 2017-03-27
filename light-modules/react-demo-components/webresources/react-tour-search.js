

class TourSearch extends React.Component {

  serverRequest = {};

  constructor(props) {
    super(props);
    this.state = {
      tours: [],
      filterText: '',
      loaded: false
    };

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  componentDidMount() {
    var _this = this;

    // Get data from CMS and set 'loaded=true' when complete.
    this.serverRequest =
      axios.all([
        axios.get(this.props.dataUrl)
      ])
      .then(axios.spread(function (tours) {
        _this.setState({
          tours: tours.data,
          loaded: true
        });
        console.log("App:serverRequest: Got all files.")
      }))
  }

  componentWillUnmount() {
    if (this.serverRequest){
      //axios - this.serverRequest.abort();
    }
  }

  render() {
    if (this.state.loaded === false){
      return (<div>Loading...</div>)

    }else{
      return (
        <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}

          labelSearch={this.props.labelSearch}
          />
        <TourList
          tours={this.state.tours}
          filterText={this.state.filterText}

          linkContext={this.props.linkContext}
          labelTours={this.props.labelTours}
          labelFeatured={this.props.labelFeatured}
          />
        </div>
    )}
  }
}


class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
  }

  /* Call parents callbacks. */
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
    return (
      <form>
            <input
              type="text"
              value={this.props.filterText}
              onChange={this.handleFilterTextInputChange}
              id="search"
              placeholder={this.props.labelSearch}
            />
      </form>
    );
  }
}

class TourList extends React.Component {

  constructor(props) {
    console.log("Construct TourList")
    super(props);
    this.isFilterMatch = this.isFilterMatch.bind(this)
  }

  isFilterMatch(tour) {
    const isSearchMatch = (tour.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1)
    return isSearchMatch
  }

  render() {
    const filteredTours = this.props.tours.filter(this.isFilterMatch);

    return (
      <div>
        <div className="tour-search__count">{filteredTours.length} {this.props.labelTours}</div>
        <div className="tour-search__list">
        {filteredTours.map( (tour) =>
          <Tour key={tour.name} tour={tour}  labelFeatured={this.props.labelFeatured}  linkContext={this.props.linkContext}/>
        )}
        </div>
      </div>
    )
  }
}


class Tour extends React.Component {

  render() {
    return (
      <div className="tour-search__list__tour">
        <a href={this.props.linkContext + this.props.tour["@link"]}>
          {this.props.tour.name}
        </a>
        <span className="tour-search__list__featured">{(this.props.tour.isFeatured)?this.props.labelFeatured:''}</span>
      </div>
    )
  }
}
