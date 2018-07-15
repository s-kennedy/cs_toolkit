import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { withStyles, theme } from "@material-ui/core/styles";
import Link from "gatsby-link";

const styles = theme => ({
  yellow: {
    color: "#f7a700",
  },
  orange: {
    color: "#f06b33",
  },
  teal: {
    color: "#01b4aa",
  },
})

class MenuSection extends React.Component {
  state = {
    anchorEl: null
  };

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = `${this.props.section.pageType}-dropdown`;
    const { props } = this;

    return (
      <div>
        <Button
          aria-owns={open ? id : null}
          aria-haspopup="true"
          onClick={this.openMenu}
          className={props.classes[props.section.color]}
        >
          {props.section.title}
        </Button>
        <Menu
          id={id}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          getContentAnchorEl={null}
          open={open}
          onClose={this.closeMenu}
        >
          {props.pages.map(pageNode => {
            const page = pageNode.node;
            const pageTitle = page.navigation.displayTitle || page.title;

            return (
              <MenuItem
                key={page.slug}
                component={Link}
                to={`/${page.slug}`}
                onClick={this.closeMenu}
              >
                {pageTitle}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(MenuSection);
