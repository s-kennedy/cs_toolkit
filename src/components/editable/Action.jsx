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
    <div className="action-link">
      <Editable
        editor={LinkEditor}
        handleSave={handleSave}
        content={{ url: props.url, anchor: props.anchor }}
        {...props}
      >
        <div className="action-link">
          <Link to={props.url} style={styles.text}>
            {props.anchor}
          </Link>
        </div>
      </Editable>
    </div>
  );
};

export default CustomLink;
