import React from "react";
import slugify from "slugify";

import Editable from "./Editable";
import PlainTextEditor from "../editingTools/PlainTextEditor";
import LinkIcon from "@material-ui/icons/Link";

const styles = {
  anchor: {
    paddingTop: "90px",
    marginTop: "-90px",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    display: "flex",
    alignItems: "center",
    marginRight: "1rem",
  }
};

const Anchor = props => {
  const handleSave = content => {
    props.saveChanges(() =>
      props.updateContent(props.sectionIndex, props.index, content)
    );
  };

  const slug = slugify(props.text, {
    lower: true,
    remove: /[$*_+~.,()'"!\-:@%^&?=]/g
  });

  return (
    <Editable
      editor={PlainTextEditor}
      handleSave={handleSave}
      content={{ text: props.text }}
      {...props}
    >
      <div id={slug} style={styles.anchor}>
        <a href={`#${slug}`} style={styles.icon}><LinkIcon /></a>
        <span>{props.text}</span>
      </div>
    </Editable>
  );
};

export default Anchor;
