import React, { Component } from "react";
import CONFIG from '../config'

class addLicence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "Add",
      hideDatePicker: true,
      hideConfirmButton: true,
      hideCancelButton: true,
      date: null
    };
  }

  showDatePicker() {
    this.setState({
      value: "Pick date",
      hideDatePicker: false,
      hideCancelButton: false
    });
  }

  datePicker(e) {
    this.setState({
      value: `Confirm ${e.target.value}`,
      hideDatePicker: true,
      hideConfirmButton: false,
      date: e.target.value
    });
  }

  addLicence() {
    this.setState({
      value: 'Adding licence...',
      hideConfirmButton: true
    });

    fetch(`${CONFIG.ORIGIN}api/admin/licences/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({userId: this.props.id, maxUsers: '1', expiresAt: this.state.date, token: CONFIG.TOKEN})
      }).then(console.log('Licence added'));
  }

  cancelButton() {
    this.setState({
      value: "Add",
      hideDatePicker: true,
      hideConfirmButton: true,
      hideCancelButton: true,
      date: null
    });
  }

  render() {
    return (
      <div>
        <span onClick={this.showDatePicker.bind(this)}>{this.state.value}</span>
        <input type="date" className={`date ${this.state.hideDatePicker ? 'hidden' : ''}`} onChange={this.datePicker.bind(this)}></input>
        <button className={`button ${this.state.hideConfirmButton ? 'hidden' : ''}`} onClick={this.addLicence.bind(this)}>Confirm</button>
        <button className={`button ${this.state.hideCancelButton ? 'hidden' : ''}`} onClick={this.cancelButton.bind(this)}>Cancel</button>
      </div>
    );
  }
}

export default addLicence;
