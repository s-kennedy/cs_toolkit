import React from 'react';

const MenuItem = (props) => {
  const header = props.header ? 'header' : '';
  const indent = props.indent ? 'indent' : '';
  const parent = props.parent ? 'parent' : '';

  return(
    <div className={`menu-item ${header} ${indent} ${props.color}`} onMouseOver={props.handleMouseOver} onClick={props.handleClick}>
      { props.children }
      {
        props.parent &&
        <i className="fa fa-caret-right"></i>
      }
    </div>
  )
}

export default MenuItem;