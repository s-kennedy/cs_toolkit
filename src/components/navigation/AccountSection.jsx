import React from "react";
import Link from "gatsby-link";

import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const styles = {
  iconLabel: {
    marginRight: "4px"
  }
}

class AccountSection extends React.Component {
  state = {
    anchorEl: null
  }

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  closeMenu = e => {
    this.setState({ anchorEl: null });
  };

  render() {
    if (this.props.isLoggedIn) {
      const open = Boolean(this.state.anchorEl);
      const accountName = this.props.user.displayName
      ? this.props.user.displayName
      : "Account";

      return(
        <div>
          <Button
            aria-owns={open ? "menu-appbar" : null}
            aria-haspopup="true"
            onClick={this.openMenu}
            color="default"
          >
            <span className="hide-on-mobile" style={styles.iconLabel}>
              {accountName}
            </span>
            <AccountCircle />
          </Button>
          <Menu
            id="menu-appbar"
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
            <MenuItem
              component={Link}
              to={"/dashboard"}
              onClick={this.closeMenu}
            >
              Dashboard
            </MenuItem>
            <MenuItem onClick={this.props.handleLogout}>Sign out</MenuItem>
          </Menu>
        </div>
      )
    }

    return(
      <Button color="default" onClick={this.props.handleLogin}>
        <span className="hide-on-mobile" style={styles.iconLabel}>
          Sign In / Sign Up
        </span>
        <AccountCircle />
      </Button>
    )
  }
}

export default AccountSection;
