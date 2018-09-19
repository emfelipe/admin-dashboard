import React, { Component } from "react";

class TableFilter extends Component {
  render() {
    switch (this.props.type) {
      case "dateRange":
        // console.log('VALUE?', this.props.value);
        return (
          <React.Fragment>
            <input
              type="date"
              key={"start"}
              name={`${this.props.name}Start`}
              value={this.props.value.start}
              onChange={this.props.onChangeFunction}
              className={this.props.className}
            />
            <input
              type="date"
              key={"end"}
              name={`${this.props.name}End`}
              value={this.props.value.end}
              onChange={this.props.onChangeFunction}
              className={this.props.className}
            />
          </React.Fragment>
        );
      case "text":
        return (
          <input
            key={this.props.name}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChangeFunction}
            className={this.props.className}
          />
        );
      case "select":
        let options = [];
        options.push(
          <option key={"e"} value={""}>
            {"Everything"}
          </option>
        );
        for (let i = 0; i < this.props.selectFields.length; i++) {
          let value = this.props.selectFields[i];
          options.push(
            <option key={i} value={value}>
              {value}
            </option>
          );
        }
        return (
          <select
            onChange={this.props.onChangeFunction}
            name={this.props.name}
            value={this.props.value}
            className={this.props.className}
          >
            {options}
          </select>
        );
      default:
        return <span>-</span>;
    }
  }
}

export default TableFilter;
