import React from "react";

import { Link } from "react-router-dom";

import DataTable from "../DataTable/DataTable";
import TableActionButton from "../DataTable/TableActionButton";

import { getDateString } from "../../helper/date";
import { toIDR } from "../../helper/format";

const tableHeaders = [
  "No",
  "No. Invoice",
  "Email",
  "Date",
  "Total Course",
  "Total Price",
  "Action",
];

const AdminInvoiceTable = (props) => {
  const { invoices } = props;

  return (
    <DataTable
      headers={tableHeaders}
      rows={invoices.map((invoice, index) => [
        index + 1,
        invoice.no_invoice,
        invoice.email,
        getDateString(invoice.date),
        invoice.total_course,
        toIDR(invoice.total_price),

        <TableActionButton
          component={Link}
          to={`/detailinvoice/${invoice.invoice_id}`}
        >
          Details
        </TableActionButton>,
      ])}
    />
  );
};

export default AdminInvoiceTable;
