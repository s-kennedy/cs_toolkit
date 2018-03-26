import React from 'react';
import { filter, orderBy } from "lodash";
import Link, { navigateTo } from "gatsby-link";

import MenuItem from './MenuItem';
import MenuColumn from './MenuColumn';


export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  filterPagesByType = (type) => {
    return orderBy(filter(
      this.props.pages,
      page => page.node.navigation.group === type
    ), 'node.navigation.order')
  };

  setSelected = (selected) => {
    this.setState({ selected })
  }

  generateSubmenu = (type, color) => {
    const pages = this.filterPagesByType(type);

    return (
      <MenuColumn>
        {pages.map(page => {
          const pageTitle =
            page.node.navigation.displayTitle || page.node.title;

          const handleClick = () => {
            navigateTo(`/${page.node.slug}`);
            this.props.close()
          }

          return (
              <MenuItem indent color={`light-${color}`} handleClick={handleClick}>{pageTitle}</MenuItem>
          );
        })}
      </MenuColumn>
    )
  }

  render() {
    const mainMenuItems = [
      {
        title: 'About',
        color: null,
        indent: false,
        submenu: 'about'
      },
      {
        title: 'Building Blocks',
        color: null,
        indent: false,
      },
      {
        title: 'A: Analysis',
        color: 'yellow',
        indent: true,
        submenu: 'building_block_a'
      },
      {
        title: 'B: Design',
        color: 'orange',
        indent: true,
        submenu: 'building_block_b'
      },
      {
        title: 'C: MEAL',
        color: 'teal',
        indent: true,
        submenu: 'building_block_c'
      },
      {
        title: 'Reference',
        color: null,
        indent: false,
        submenu: 'reference'
      },
    ]

    return (
      <div id="mega-menu" className={`mega-menu ${this.props.isOpen ? 'open' : 'collapsed'}`} aria-hidden={!this.props.isOpen}>
        <div className="content-container">
        <button id="close-menu" onClick={this.props.close} ><i className="fas fa-times"></i></button>
          <MenuColumn>
            {
              mainMenuItems.map(item => {
                const isSelected = this.state.selected === item.title;
                const handleClick = () => {
                  if (isSelected) {
                    return this.setSelected(null);
                  }
                  return this.setSelected(item.title)
                }

                return (
                  <div>
                    <MenuItem
                      key={item.title}
                      header
                      color={item.color}
                      indent={item.indent}
                      parent={!!item.submenu}
                      handleClick={handleClick}
                    >
                      {item.title}
                    </MenuItem>
                    {
                      isSelected && this.generateSubmenu(item.submenu, item.color)
                    }
                  </div>
                )
              })
            }
          </MenuColumn>
        </div>
      </div>
    );
  }
}

