import React from "react";
// import { addLicence } from '../assets/licenceManagement'
import ManageLicence from "../components/ManageLicence";

const columnsLicences = [
  {
    header: "Licence ID",
    ref: "id",
    type: "text"
  },
  {
    header: "User",
    ref: "userMail",
    type: "text",
    format: row => {
      return <a href={`./users?mail=${row.user.mail}`}>{row.user.mail}</a>;
    },
    className: "disabled"
  },
  {
    header: "Expires at",
    ref: "expiresAt",
    type: "dateRange",
    format: row => {
      return new Date(row.expiresAt).toLocaleString();
    }
  },
  {
    header: "Edit",
    ref: "edit",
    type: "-",
    format: row => {
      return <ManageLicence key={row.id} id={row.id} />;
    }
  }
];

export default columnsLicences;
