import React, { Component } from "react";

class addLicence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "Add"
    };
  }

  addLicence() {
    console.log(this.props.id);
    this.setState({
      value: "Adding"
    });
  }

  render() {
    return (
      <div>
        <span onClick={this.addLicence.bind(this)}>{this.state.value}</span>
      </div>
    );
  }
}

export default addLicence;
