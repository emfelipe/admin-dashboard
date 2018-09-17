import React, { Component } from "react";
import queryString from "query-string";
import TableFilter from "../components/TableFilter";
import Rows from "../components/Rows";

function debounce(a, b, c) {
  var d, e;
  return function() {
    function h() {
      (d = null), c || (e = a.apply(f, g));
    }
    var f = this,
      g = arguments;
    return (
      clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
    );
  };
}

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params:
        { ...queryString.parse(this.props.location.search), page: 1 } || {},
      data: { loading: true },
      nextPage: false,
      previousPage: false,
      loading: false,
      count: 0
    };
  }

  componentWillMount() {
    this.fetchPage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    if (!this.props.location.search || this.props.location.search === "") {
      // console.log("ROUTE - STATE UPDATE");
      this.setState({
        params: {}
      });
      this.fetchPage();
    }
  }

  nextPage = async () => {
    if (!this.state.nextPage || this.state.loading) {
      return;
    }
    this.setState({
      params: {
        ...this.state.params,
        page: this.state.params.page + 1 || 2
      },
      loading: true
    });
    await this.updateURLqueryParams({ page: this.state.params.page + 1 || 2 });
    this.fetchPage();
  };

  previousPage = async () => {
    if (!this.state.previousPage || this.state.loading) {
      return;
    }
    this.setState({
      params: {
        ...this.state.params,
        page: this.state.params.page - 1 || 1
      },
      loading: true
    });
    await this.updateURLqueryParams({ page: this.state.params.page - 1 || 1 });
    this.fetchPage();
  };

  fetchPage = debounce(() => {
    console.log("FETCH PARAMS", this.state.params);
    this.setState({
      loading: true
    });
    let urlQueryParams;
    if (!this.props.location.search) {
      urlQueryParams = JSON.stringify({token: this.props.token});
    } else {
      urlQueryParams = JSON.stringify({...this.state.params, token: this.props.token});
    }
    console.log('TOKEN', this.props.token);
    fetch(`http://localhost:8080/api/admin/${this.props.link}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: urlQueryParams
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          data: data.data.rows,
          nextPage: data.data.paging.next,
          previousPage: data.data.paging.previous,
          loading: false,
          count: data.data.count
        })
      );
    // console.log(this.state.data);
  }, 100);

  updateURLqueryParams(params) {
    let oldParams = queryString.parse(this.props.location.search);
    let newParams = { ...oldParams, ...params };

    Object.keys(newParams).map(function(key) {
      if (newParams[key] === "") {
        delete newParams[key];
      }
      return null;
    });

    this.props.history.push({
      pathname: this.props.history.location.pathname,
      search: `?${queryString.stringify(newParams)}`
    });
  }

  onChangeInput = async e => {
    // console.log("onchange", e.target.name);
    this.setState({
      params: {
        ...this.state.params,
        page: 1,
        [e.target.name]: e.target.value
      }
    });
    await this.updateURLqueryParams({
      [e.target.name]: e.target.value,
      page: 1
    });
    // console.log("stateee", this.state.params.registeredAtstart);
    this.fetchPage();
  };

  columns = this.props.columns;

  render() {
    // console.log("PARAMS", this.columns);
    return (
      <div className={this.state.loading ? "s loading" : "s"}>
        <div>
          <h1>{this.props.title}</h1>
          <table>
            <thead>
              <tr>
                {this.columns.map((x, i) => (
                  <th key={i}>{this.columns[i].header}</th>
                ))}
              </tr>
              <tr>
                {this.columns.map((x, i) => (
                  <th key={i}>
                    <TableFilter
                      type={this.columns[i].type}
                      key={i}
                      name={this.columns[i].ref}
                      value={
                        this.columns[i].type !== "dateRange"
                          ? this.state.params[this.columns[i].ref] || ""
                          : {
                              start:
                                this.state.params[
                                  `${this.columns[i].ref}start`
                                ] || "",
                              end:
                                this.state.params[
                                  `${this.columns[i].ref}end`
                                ] || ""
                            }
                      }
                      onChangeFunction={this.onChangeInput}
                      selectFields={this.columns[i].selectFields || null}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!this.state.data.loading ? (
                <Rows data={this.state.data} columns={this.columns} />
              ) : (
                <tr>
                  <td>Loading</td>
                </tr>
              )}
            </tbody>
          </table>
          <button
            disabled={!this.state.previousPage}
            onClick={this.previousPage}
          >
            Previous
          </button>
          <button disabled={!this.state.nextPage} onClick={this.nextPage}>
            Next
          </button>
          <span>{`${this.state.count} records`}</span>
          {/* <div>{JSON.stringify(this.state.data) || "nothing here"}</div> */}
        </div>
      </div>
    );
  }
}

export default Users;
