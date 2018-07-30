import React from "react";
// import { Link } from "gatsby";
import { filter, orderBy } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Drawer from '@material-ui/core/Drawer';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import logo from "../../assets/img/coalition-logo.png";
import RegistrationModal from "./RegistrationModal";
import MenuContent from "./MenuContent";
import AccountSection, { AccountSectionContent } from "./AccountSection";
import AdminSection, { AdminSectionContent } from "./AdminSection";


const styles = theme => ({
  drawerPaper: {
    maxWidth: '80vw',
    minWidth: '280px',
    background: theme.palette.grey[100],
  },
  toolbar: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  logo: {
    height: "60px",
    marginBottom: "4px",
    marginTop: "4px"
  },
  yellow: {
    color: "#f7a700",
  },
  orange: {
    color: "#f06b33",
  },
  teal: {
    color: "#01b4aa",
  },
  root: {
    fontSize: '1rem',
    whiteSpace: 'normal',
    height: 'auto',
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  }
});

const menuSections = [
  {
    title: "Introduction",
    color: null,
    navGroup: "about"
  },
  {
    title: "A: Analysis",
    color: "yellow",
    navGroup: "analysis"
  },
  {
    title: "B: Design",
    color: "orange",
    navGroup: "design"
  },
  {
    title: "C: MEAL",
    color: "teal",
    navGroup: "meal"
  },
  {
    title: "Case Study",
    color: null,
    navGroup: "case-study"
  },
  {
    title: "Tools",
    color: null,
    navGroup: "tools"
  },
  {
    title: "Reference",
    color: null,
    navGroup: "reference"
  }
];

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }
  }

  filterPagesByType = type => {
    return orderBy(
      filter(this.props.pages, page => page.node.navigation.group === type),
      "node.navigation.order"
    );
  };

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget })
  }

  closeMenu = e => {
    this.setState({ anchorEl: null })
  }

  render() {
    const openModal = Boolean(this.props.showRegistrationModal);
    const openMenu = Boolean(this.state.anchorEl)

    return (
      <div>
        <AppBar color="inherit" position="fixed">
          <Toolbar className={this.props.classes.toolbar}>
            <a href="/">
              <img className={this.props.classes.logo} src={logo} alt="Save the Children" />
            </a>

            <IconButton
              aria-label="Menu"
              aria-owns={openMenu ? 'main-menu' : null}
              aria-haspopup="true"
              onClick={this.openMenu}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={openMenu}
              onClose={this.closeMenu}
              classes={{
                paper: this.props.classes.drawerPaper,
              }}
            >
              <List>
                {menuSections.map(section => {
                  const pages = this.filterPagesByType(section.navGroup);
                  return (
                    <ExpansionPanel key={`mobile-${section.navGroup}`} className={this.props.classes.expanded}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={this.props.classes[section.color]}>
                        {section.title}
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <MenuContent
                          navGroup={this.state.selected}
                          menuItems={pages}
                          closeMenu={this.closeMenu}
                          {...this.props}
                        />
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  );
                })}

                {
                  this.props.isLoggedIn ?
                  <ExpansionPanel className={this.props.classes.expanded}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <AccountSection classes={this.props.classes} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <AccountSectionContent closeMenu={this.closeMenu} classes={this.props.classes} />
                    </ExpansionPanelDetails>
                  </ExpansionPanel> :
                  <ListItem>
                    <AccountSection classes={this.props.classes} />
                  </ListItem>
                }

                {
                  this.props.isLoggedIn &&
                  <ExpansionPanel className={this.props.classes.expanded}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <AdminSection />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <AdminSectionContent closeMenu={this.closeMenu} classes={this.props.classes} />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                }
              </List>
            </Drawer>

          </Toolbar>
        </AppBar>
        <RegistrationModal
          open={openModal}
          onToggleRegistrationModal={this.props.onToggleRegistrationModal}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);
