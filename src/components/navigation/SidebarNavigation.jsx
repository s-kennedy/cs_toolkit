import React from "react";
import { filter, orderBy } from "lodash";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import MenuContent from "./MenuContent";

const styles = theme => ({
  drawerPaper: {
    maxWidth: "25vw",
    minWidth: "280px",
    background: "#f3f7f6",
  },
  toolbar: {
    justifyContent: "space-between",
    alignItems: "center"
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
    color: "#f7a700"
  },
  orange: {
    color: "#f06b33"
  },
  teal: {
    color: "#01b4aa"
  },
  root: {
    fontSize: "1rem",
    whiteSpace: "normal",
    height: "auto"
  },
  navbarOffset: {
    height: "74px"
  },
  padding: {
    paddingTop: "8px",
    paddingLeft: "8px",
    paddingRight: "8px",
    paddingBottom: "8px"
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
    };
  }

  filterPagesByType = type => {
    return orderBy(
      filter(this.props.pages, page => page.node.navigation.group === type),
      "node.navigation.order"
    );
  };

  render() {
    const currentPath = this.props.location.pathname;

    return (
      <Hidden smDown>
        <Drawer
          anchor="right"
          variant="permanent"
          elevation={12}
          classes={{
            paper: this.props.classes.drawerPaper
          }}
        >
          <List className={this.props.classes.padding}>
            <div className={this.props.classes.navbarOffset} />
            {menuSections.map(section => {
              const pages = this.filterPagesByType(section.navGroup);
              const currentPageSection = currentPath.split('/')[1];
              const defaultExpanded = (currentPageSection === section.navGroup) || (section.navGroup === 'about' && currentPath === '/')

              return (
                <ExpansionPanel
                  key={`mobile-${section.navGroup}`}
                  className={this.props.classes.expanded}
                  defaultExpanded={defaultExpanded}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    className={this.props.classes[section.color]}
                  >
                    {section.title}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <MenuContent
                      menuItems={pages}
                      currentPath={currentPath}
                      {...this.props}
                    />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })}
          </List>
        </Drawer>
      </Hidden>
    );
  }
}

export default withStyles(styles)(withRouter(Navigation));
