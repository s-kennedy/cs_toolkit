import React from "react";
import { Link } from "gatsby";
import ArrowForward from "@material-ui/icons/ArrowForward"
import ArrowBack from "@material-ui/icons/ArrowBack"

import Editable from "./Editable";
import LinkEditor from "../editingTools/LinkEditor";

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: '#FFF',
    display: 'flex',
  },
  text: {
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  icon: {
    fontSize: '2rem'
  }
};

const PageNavButton = props => {
  const handleSave = content => () => {
    props.updateContent(props.sectionIndex, props.index, content)
  }

  const ArrowIcon = props.direction === 'next' ? ArrowForward : ArrowBack
  const order = props.direction === 'next' ? 1 : 0
  const iconStyles = { ...styles.icon, order: order }

  return (
    <Editable
      editor={LinkEditor}
      handleSave={handleSave}
      content={{ link: props.link, anchor: props.anchor }}
      {...props}
    >
      <div className="page-nav" style={styles.container}>
        <Link to={props.link} style={styles.link}>
          <ArrowIcon style={iconStyles} />
          <span style={styles.text}>{props.anchor}</span>
        </Link>
      </div>
    </Editable>
  );
};

export default PageNavButton;
