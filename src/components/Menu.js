import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Menu extends Component {
    render() {
        return (
            <div className="menu l h100">
                <NavLink className="e w100" exact to="/">Statistics</NavLink>
                <NavLink className="e w100" to="/users">Users</NavLink>
                <NavLink className="e w100" to="/payments">Payments</NavLink>
                <NavLink className="e w100" to="/licences">Licences</NavLink>
            </div>
        )
    }
}

