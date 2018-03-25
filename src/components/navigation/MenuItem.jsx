import React from 'react';

const MenuItem = (props) => {
  const header = props.header ? 'header' : '';
  const indent = props.indent ? 'indent' : '';
  const parent = props.parent ? 'parent' : '';
  const selected = props.selected ? 'selected': '';
  const caretClass = props.selected ? 'fa-caret-right' : 'fa-angle-right';

  return(
    <div className={`menu-item ${header} ${indent} ${props.color} ${selected}`} onMouseOver={props.handleMouseOver} onClick={props.handleClick}>
      { props.children }
      {
        props.parent &&
        <i className={`fa ${caretClass}`}></i>
      }
    </div>
  )
}

export default MenuItem;