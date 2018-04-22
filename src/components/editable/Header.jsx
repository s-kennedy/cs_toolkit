import React from "react";

import Editable from "./Editable";
import PlainTextEditor from "../editingTools/PlainTextEditor";

const styles = {
  header: {
    display: "flex"
  }
};

const Header = (props) => {
  const handleSave = content => {
    props.updateContent(props.sectionIndex, props.index, content)
  }

  return (
    <Editable
      editor={PlainTextEditor}
      handleSave={handleSave}
      content={{ text: props.text }}
      {...props}
    >
      <div className='header' style={styles.header}>
        <h3>
          { props.text }
          </h3>
        </div>
    </Editable>
  );
}

export default Header;
