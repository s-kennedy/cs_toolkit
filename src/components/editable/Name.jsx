import React from "react";

import Editable from "./Editable";
import PlainTextEditor from "../editingTools/PlainTextEditor";

const styles = {
  name: {
    fontWeight: 'bold'
  }
}

const Name = (props) => {
  const handleSave = content => () => {
    props.updateContent(props.sectionIndex, props.index, content)
  }

  return (
    <Editable
      editor={PlainTextEditor}
      handleSave={handleSave}
      content={{ text: props.text }}
      {...props}
    >
      <p style={styles.name}>{ props.text }</p>
    </Editable>
  );
}

export default Name;