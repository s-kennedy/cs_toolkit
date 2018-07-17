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
  text: {
    marginLeft: '1rem',
    marginRight: '1rem',
    color: '#FFF',
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
        <ArrowIcon style={iconStyles} />
        <Link to={props.link} style={styles.text}>
          {props.anchor}
        </Link>
      </div>
    </Editable>
  );
};

export default PageNavButton;
