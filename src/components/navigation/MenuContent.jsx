import React from "react";
// import { Link } from "gatsby";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import { find } from "lodash";

import { AccountSectionContent } from "./AccountSection";
import { AdminSectionContent } from "./AdminSection";

const MenuItemComponent = props => {
  const pageUrl = `/${props.page.slug}/`;
  const pageTitle = props.page.navigation.displayTitle || props.page.title;
  const selected = pageUrl === props.currentPath;
  const itemStyle = {};
  if (props.nested) {
    itemStyle.marginLeft = '16px'
  }
  if (selected) {
    itemStyle.backgroundColor = "rgba(0, 0, 0, 0.14)"
  }

  return (
    <MenuItem
      key={props.page.id}
      onClick={props.closeMenu}
      className={`${props.classes.root}`}
      selected={selected}
      style={itemStyle}
    >
      <a href={pageUrl} className="plain">
        {pageTitle}
      </a>
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
                const page = find(props.pages, (p) => p.node.id === nestedPage.id)
                return (
                  <MenuItemComponent
                    key={page.node.id}
                    page={page.node}
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
