import React, { Component } from "react";
import CONFIG from "../config";

class manageLicence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: <b className="tableButton">Edit</b>,
      hideDatePicker: true,
      hideConfirmButton: true,
      hideCancelButton: true,
      date: null
    };
  }

  datePicker(e) {
    this.setState({
      value: `Confirm ${e.target.value}`,
      hideDatePicker: true,
      hideConfirmButton: false,
      date: e.target.value
    });
  }

  showDatePicker() {
    this.setState({
      value: "Pick date",
      hideDatePicker: false,
      hideCancelButton: false
    });
  }

  editLicence() {
    this.setState({
      value: "Editing licence...",
      hideConfirmButton: true
    });

    fetch(`${CONFIG.ORIGIN}api/admin/licences/edit`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        licenceId: this.props.id,
        expiresAt: this.state.date,
        token: CONFIG.TOKEN
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          value: data.success ? `Success - refresh page` : `Error`,
          hideCancelButton: true,
        });

        setTimeout({
          
        }, 2000);
      });
  }

  cancelButton() {
    this.setState({
      value: <b className="tableButton">Edit</b>,
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
        <input
          type="date"
          className={`date ${this.state.hideDatePicker ? "hidden" : ""}`}
          onChange={this.datePicker.bind(this)}
        />
        <button
          className={`button ${this.state.hideConfirmButton ? "hidden" : ""}`}
          onClick={this.editLicence.bind(this)}
        >
          Confirm
        </button>
        <button
          className={`button ${this.state.hideCancelButton ? "hidden" : ""}`}
          onClick={this.cancelButton.bind(this)}
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default manageLicence;
