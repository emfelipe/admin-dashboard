import React from 'react';
// import { addLicence } from '../assets/licenceManagement'
import AddLicence from '../components/AddLicence'

const columnsUsers = [
  {
    header: "ID",
    ref: "id",
    type: "text"
  },
  {
    header: "Mail",
    ref: "mail",
    type: "text"
  },
  {
    header: "Registered at",
    ref: "registeredAt",
    type: "dateRange",
    format: row => {
      return new Date(row.registeredAt).toLocaleString();
    }
  },
  {
    header: "License expires at",
    ref: "licences",
    format: row => {
      if (row.licences.length === 0) {
        return <AddLicence key={row.id} id={row.id}/>
      }
      return row.licences
        .reduce((current, x) => {
          let expiresAt = new Date(x.expiresAt);
          return expiresAt > current ? expiresAt : current;
        }, new Date(0))
        .toLocaleString();
    },
    type: "dateRange"
  },
  {
    header: "Register source",
    ref: "source",
    type: "select",
    selectFields: [
      "register",
      "landing",
      "features_filters",
      "features_transitions",
      "features_transitions"
    ]
  }
];

export default columnsUsers;
