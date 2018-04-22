import React from "react";
import { Jumbotron, Container } from 'reactstrap';

import Editable from "./Editable";
import ImageEditor from "../editingTools/ImageEditor";

const defaultImage = "http://placehold.it/2000x1000";

const BackgroundImage = props => {
  const styles = {
    jumbotron: {
      display: 'flex',
      background: `url(${props.image}) no-repeat center center`,
      backgroundSize: 'cover',
      height: props.height,
      minHeight: '440px',
      alignItems: 'flex-end'
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
      <Jumbotron style={styles.jumbotron} fluid>
        <Container fluid>
          {props.children}
        </Container>
      </Jumbotron>
    </Editable>
  );
};

export default BackgroundImage;
