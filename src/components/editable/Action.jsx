import React from "react";
import Link from "gatsby-link";

import Editable from "./Editable";
import LinkEditor from "../editingTools/LinkEditor";

const styles = {
  text: {
    fontWeight: "bold"
  }
};

const CustomLink = props => {
  const handleSave = content => {
    props.updateContent(props.sectionIndex, props.index, content)
  }

  return (
    <Editable
      editor={LinkEditor}
      handleSave={handleSave}
      content={{ link: props.link, anchor: props.anchor }}
      {...props}
    >
      <div className="action-link">
        <Link to={props.link} style={styles.text}>
          {props.anchor}
        </Link>
      </div>
    </Editable>
  );
};

export default CustomLink;
