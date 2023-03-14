import React from "react";

import Button from "@mui/material/Button";

const TableActionButton = (props) => {
  const { children, ...others } = props;

  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{ width: 1, borderRadius: "8px", textTransform: "none" }}
      {...others}
    >
      {children}
    </Button>
  );
};

export default TableActionButton;
