import React, { Component } from "react";

class Statistics extends Component {
  addLicence() {
    fetch(`http://localhost:8080/api/admin/licences/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({userId: '2', maxUsers: '1', expiresAt: new Date('2020-09-05T19:58:31.334Z')})
      }).then(console.log('eldo'))
  }

  render() {
    return <div onClick={this.addLicence}>add lic</div>;
  }
}

export default Statistics;
