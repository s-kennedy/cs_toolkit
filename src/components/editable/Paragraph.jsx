import React from 'react'

import Editable from './Editable'
import RichTextEditor from '../editingTools/RichTextEditor'


const Paragraph = (props) => {
  const handleSave = content => {
    props.saveChanges(() => props.updateContent(props.sectionIndex, props.index, content))
  }

  return (
    <Editable
      editor={RichTextEditor}
      handleSave={handleSave}
      content={{ text: props.text }}
      { ...props }
    >
      <div className="para" dangerouslySetInnerHTML={ {__html: props.text} } />
    </Editable>
  );
};

export default Paragraph;