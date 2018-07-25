import React from "react";
import { Link } from "gatsby";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";

import {AccountSectionContent} from "./AccountSection";
import {AdminSectionContent} from "./AdminSection";

const MenuContent = props => {
  if (props.navGroup === 'account') {
    return <AccountSectionContent closeMenu={props.closeMenu} classes={props.classes} />
  }

  if (props.navGroup === 'admin') {
    return <AdminSectionContent closeMenu={props.closeMenu} classes={props.classes} />
  }

  return (
    <List>
      {props.menuItems.map(pageNode => {
        const page = pageNode.node;
        const pageUrl = `/${page.slug}`
        const pageTitle = page.navigation.displayTitle || page.title;
        const selected = pageUrl === props.currentPath;

        return (
          <MenuItem
            tabIndex={0}
            key={page.slug}
            component={Link}
            to={pageUrl}
            onClick={props.closeMenu}
            className={props.classes.root}
            selected={selected}
          >
            {pageTitle}
          </MenuItem>
        );
      })}
    </List>
  )
}

export default MenuContent