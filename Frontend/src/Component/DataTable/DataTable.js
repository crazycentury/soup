import React from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { alpha, styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "none",
  fontSize: "1rem",
  textAlign: "center",

  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    fontWeight: "600",
  },

  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.gray2.main,
    fontWeight: "500",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },

  "&:nth-of-type(even)": {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },
}));

const DataTable = (props) => {
  const { headers, rows, maxWidth = "calc(100% - 64px)" } = props;

  return (
    <TableContainer component={Paper} sx={{ maxWidth, mx: "auto", my: "32px" }}>
      <Table sx={{ minWidth: "600px" }}>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <StyledTableCell key={index}>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              {row.map((item, index) => (
                <StyledTableCell key={index}>{item}</StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
