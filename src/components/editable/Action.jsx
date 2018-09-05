import React from "react";
import { Link } from "gatsby";
import LinkIcon from "@material-ui/icons/Link";

import Editable from "./Editable";
import LinkEditor from "../editingTools/LinkEditor";

const styles = {
  action: {
    display: "flex"
  },
  text: {
    fontWeight: "bold"
  },
  icon: {
    marginRight: "10px",
    color: "#e70094"
  }
};

const CustomLink = props => {
  const handleSave = content => {
    props.saveChanges(() =>
      props.updateContent(props.sectionIndex, props.index, content)
    );
  };

  const externalLink = props.link.startsWith('https://') || props.link.startsWith('http://');

  return (
    <Editable
      editor={LinkEditor}
      handleSave={handleSave}
      content={{ link: props.link, anchor: props.anchor }}
      {...props}
    >
      <div className="action-link" style={styles.action}>
        <span style={styles.icon}>
          <LinkIcon />
        </span>
        {externalLink ? (
          <a href={props.link} style={styles.text}>
            {props.anchor}
          </a>
        ) : (
          <Link to={props.link} style={styles.text}>
            {props.anchor}
          </Link>
        )}
      </div>
    </Editable>
  );
};

export default CustomLink;
