import React, { Component } from "react";
import DatePicker from "react-datepicker";

class cDatePicker extends Component {
  render() {
    return (
      <button className="example-custom-input" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

cDatePicker.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

<DatePicker
  customInput={<cDatePicker />}
  selected={this.state.startDate}
  onChange={this.handleChange}
/>;
