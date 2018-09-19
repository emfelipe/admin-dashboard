import React, { Component } from "react";
import CONFIG from '../config'

class manageLicence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: <b className="tableButton">Edit</b>
    };
  }

  render() {
    return (
      <div>
        <span>{this.state.value}</span>
      </div>
    );
  }
}

export default manageLicence;
