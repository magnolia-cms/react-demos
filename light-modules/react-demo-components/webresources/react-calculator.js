

class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      val1: '',
      val2: ''
    };

    this.handleVal1TextInput = this.handleVal1TextInput.bind(this);
    this.handleVal2TextInput = this.handleVal2TextInput.bind(this);
  }

  handleVal1TextInput(e) {
    this.setState({
      val1: e.target.value
    });
  }

  handleVal2TextInput(e) {
    this.setState({
      val2: e.target.value
    });
  }

  componentDidMount() {
    var _this = this;
  }

  render() {

    var result = Number.parseInt(this.state.val1) + Number.parseInt(this.state.val2)
    console.log("result:" + this.state.val1 + "-"+ this.state.val2+ "-" + result)


    const calculateOld = function(a,b){
      if (a && b){
        return 100 + Number.parseFloat(a) + Number.parseFloat(b)
      }else{
        return '_'
      }

    }

    const calculate = function(a,b,formula){

      if (a && b){
        const result = eval(formula
          .replace('[A]', Number.parseFloat(a))
          .replace('[B]', Number.parseFloat(b)))

          return result;
      }else{
        return '_'
      }

    }


      return (
        <form>
          <div className="calculator--input">
              <label>{this.props.label1}</label>
              <input
                type="number"
                step="any"
                onChange={this.handleVal1TextInput}
                id="val1"
              />
          </div>
          <div className="calculator--input">
              <label>{this.props.label2}</label>
              <input
                type="number"
                step="any"
                onChange={this.handleVal2TextInput}
                id="val2"
              />
          </div>
          <div className="calculator--result">
              <label>{this.props.labelResult}</label>
              <span className="calculator--result--value">{calculate(this.state.val1, this.state.val2, this.props.formula)}</span>
          </div>
        </form>
    )
  }
}
