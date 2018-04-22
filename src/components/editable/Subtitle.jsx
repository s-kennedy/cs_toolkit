import React from 'react'

import Editable from './Editable';
import PlainTextEditor from '../editingTools/PlainTextEditor'


const Subtitle = (props) => {
  const handleSave = (newContent) => {
    props.updateTitle(newContent.text)
  }

  return (
    <h3>
      <Editable
        editor={PlainTextEditor}
        handleSave={handleSave}
        content={{ text: props.text }}
        { ...props }
      >
        { props.text }
      </Editable>
    </h3>
  )
};

export default Subtitle;