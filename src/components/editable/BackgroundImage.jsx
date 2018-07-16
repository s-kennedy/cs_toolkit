import React from "react";
import Grid from "@material-ui/core/Grid";

import Editable from "./Editable";
import ImageEditor from "../editingTools/ImageEditor";

const BackgroundImage = props => {
  const styles = {
    background: {
      display: 'flex',
      background: `url(${props.image}) no-repeat center center`,
      backgroundSize: 'cover',
      height: props.height,
      minHeight: '440px',
      alignItems: 'flex-end',
      padding: '2rem',
    }
  }

  const handleSave = updatedContent => {
    props.handleSave(updatedContent);
  };

  return (
    <Editable
      editor={ImageEditor}
      handleSave={handleSave}
      content={{ imageSrc: props.imageSrc }}
      editCaption={false}
      showChildren
      fullWidth
    >
      <Grid style={styles.background} container>
        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </Editable>
  );
};

export default BackgroundImage;
