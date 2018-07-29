import React from "react";
import { Link } from "gatsby";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";

import { AccountSectionContent } from "./AccountSection";
import { AdminSectionContent } from "./AdminSection";

const MenuItemComponent = props => {
  const pageUrl = `/${props.page.slug}`;
  const pageTitle = props.page.title;
  const selected = pageUrl === props.currentPath;

  return (
    <MenuItem
      tabIndex={0}
      key={props.page.slug}
      component={Link}
      to={pageUrl}
      onClick={props.closeMenu}
      className={`${props.classes.root}`}
      selected={selected}
      style={props.nested ? { marginLeft: '16px' } : {}}
    >
      {pageTitle}
    </MenuItem>
  );
};

const MenuContent = props => {
  if (props.navGroup === "account") {
    return (
      <AccountSectionContent
        closeMenu={props.closeMenu}
        classes={props.classes}
      />
    );
  }

  if (props.navGroup === "admin") {
    return (
      <AdminSectionContent
        closeMenu={props.closeMenu}
        classes={props.classes}
      />
    );
  }

  return (
    <List>
      {props.menuItems.map(pageNode => {
        const page = pageNode.node;
        return (
          <div key={page.slug}>
            <MenuItemComponent page={page} {...props} />
            {Boolean(page.navigation.nested) &&
              page.navigation.nested.map(nestedPage => {
                return (
                  <MenuItemComponent
                    key={nestedPage.page.slug}
                    page={nestedPage.page}
                    nested={true}
                    {...props}
                  />
                );
              })}
          </div>
        );
      })}
    </List>
  );
};

export default MenuContent;
