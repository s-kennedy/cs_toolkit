import React from "react";
import Link from "gatsby-link";

import Editable from "./Editable";
import LinkEditor from "../editingTools/LinkEditor";

const styles = {
  text: {
    fontWeight: "bold"
  },
  button: {
    cursor: 'pointer'
  }
};


const BtnComponent = (props) => {
  const externalLink = props.link.startsWith('https://') || props.link.startsWith('http://');

  if (externalLink) {
    return (
      <div className="stc-btn btn btn-red" style={styles.button}>
        <a href={ props.link } target='_blank'>{ props.anchor }</a>
      </div>
    )
  }

  return (
    <div className="stc-btn btn btn-red" style={styles.button}>
      <Link to={ props.link }>{ props.anchor }</Link>
    </div>
  )
}

const CustomButton = props => {
  const handleSave = content => {
    props.updateContent(props.sectionIndex, props.index, content)
  }

  return (
    <div className="action-link">
      <Editable
        editor={LinkEditor}
        handleSave={handleSave}
        content={{ link: props.link, anchor: props.anchor }}
        {...props}
      >
        <BtnComponent link={props.link} anchor={props.anchor} />
      </Editable>
    </div>
  );
};

export default CustomButton;

