import React from "react";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Link, useLocation } from "react-router-dom";

const Sidebar = (props) => {
  const { items } = props;

  const location = useLocation();

  const isSelected = (item) => {
    const currPath = location.pathname;
    return (
      currPath === item.path ||
      (item.child_pattern && item.child_pattern.test(location.pathname))
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{ "& .MuiDrawer-paper": { width: "16.66%", pt: 12 } }}
    >
      <List>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={isSelected(item)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
