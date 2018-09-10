import React, { Component } from "react";

class Rows extends Component {
  render() {
    if (this.props.data.length > 0) {
      let columnsLength = Object.keys(this.props.columns).length;
      let rowsLength = this.props.data.length;
      let rows = [];
      for (let i = 0; i < rowsLength; i++) {
        let cell = [];
        for (let x = 0; x < columnsLength; x++) {
          let value = this.props.data[i][this.props.columns[x]["ref"]];
          if (typeof this.props.columns[x].format === "function") {
              value = this.props.columns[x].format(this.props.data[i])
          }
          cell.push(
            <td key={x}>
              {value}
            </td>
          );
        }
        rows.push(<tr key={i}>{cell}</tr>);
      }
      return <React.Fragment>{rows}</React.Fragment>;
    }
    return (
      <tr>
        <td>Nothing here</td>
      </tr>
    );
  }
}

export default Rows;
