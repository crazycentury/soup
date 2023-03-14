import React from "react";

import MaterialLink from "@mui/material/Link";

import { Link } from "react-router-dom";

const CustomLink = (props) => {
  const { children, ...others } = props;

  return (
    <MaterialLink
      component={Link}
      underline="hover"
      color="#1976d2"
      {...others}
    >
      {children}
    </MaterialLink>
  );
};

export default CustomLink;
