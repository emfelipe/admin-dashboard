const columnsUsers = [
  {
    header: "ID",
    ref: "id",
    type: "text"
  },
  {
    header: "User mail",
    ref: "userMail",
    type: "text",
    format: row => {
      return row.user.mail;
    }
  },
  {
    header: "Price",
    ref: "price",
    type: "text",
    format: row => {
      if (row.currency.position === "before") {
        return `${row.currency.symbol}${row.price / 100}`;
      } else {
        return `${row.price / 100}${row.currency.symbol}`;
      }
    }
  },
  {
    header: "Created at",
    ref: "createdAt",
    type: "dateRange",
    format: row => {
      return new Date(row.createdAt).toLocaleString();
    }
  },
  {
    header: "Paid at",
    ref: "paidAt",
    type: "dateRange",
    format: row => {
      return row.paidAt ? new Date(row.paidAt).toLocaleString() : "-";
    }
  },
  {
    header: "Payment method",
    ref: "paymentMethod",
    type: "select",
    format: row => {
      return row.paymentMethod.name;
    },
    selectFields: ["paypal", "bankTransfer", "paysafecard", "creditCard"]
  }
];

export default columnsUsers;
