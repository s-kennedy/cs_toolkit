import React from "react";
import Typography from '@material-ui/core/Typography';

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
        <Typography variant="headline">
          { props.text }
        </Typography>
      </div>
    </Editable>
  );
}

export default Header;
