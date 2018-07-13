import React from "react";
import Link from "gatsby-link";
import MenuItemParent from "./MenuItemParent";
import MenuItem from "./MenuItem";
import MenuColumn from "./MenuColumn";
import { map, orderBy, filter } from "lodash";

const filterToolsByAction = (tools, action) => {
  return filter(tools, page => page.node.navigation.action === action);
};

const BuildingBlocksMenu = (props) => {

  const analysisPages = props.filterPagesByType('building_block_a');
  const designPages = props.filterPagesByType('building_block_b');
  const mealPages = props.filterPagesByType('building_block_c');

  return (
    <div className="menu-container">

      <MenuColumn>
        <MenuItem header>A: Analysis</MenuItem>
        {
          analysisPages.map(page => {
            const pageTitle = page.node.navigation.displayTitle || page.node.title;
            return (
              <Link
                to={`/${page.node.slug}`}
                key={page.node.slug}
              >
                <MenuItem parent color="yellow">{pageTitle}</MenuItem>
              </Link>
            )
          })
        }
      </MenuColumn>

      <MenuColumn>
        <MenuItem header>B: Design</MenuItem>
        {
          designPages.map(page => {
            const pageTitle = page.node.navigation.displayTitle || page.node.title;
            return (
              <Link
                to={`/${page.node.slug}`}
                key={page.node.slug}
              >
                <MenuItem parent color="orange">{pageTitle}</MenuItem>
              </Link>
            )
          })
        }
      </MenuColumn>

      <MenuColumn>
        <MenuItem header>A: Analysis</MenuItem>
        {
          mealPages.map(page => {
            const pageTitle = page.node.navigation.displayTitle || page.node.title;
            return (
              <Link
                to={`/${page.node.slug}`}
                key={page.node.slug}
              >
                <MenuItem parent color="teal">{pageTitle}</MenuItem>
              </Link>
            )
          })
        }
      </MenuColumn>

    </div>
  );
}

export default BuildingBlocksMenu
