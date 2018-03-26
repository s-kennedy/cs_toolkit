import React from "react";

const MenuItem = props => {
  const header = props.header ? "header" : "";
  const indent = props.indent ? "indent" : "";
  const parent = props.parent ? "parent" : "";
  const selected = props.selected ? "selected" : "";
  const caretClass = props.selected ? "fa-angle-up" : "fa-angle-down";
  const current = props.currentPage ? "current" : ""

  return (
    <div
      className={`menu-item ${header} ${indent} ${props.color} ${selected} ${parent}`}
      onMouseOver={props.handleMouseOver}
      onClick={props.handleClick}
    >
      <div className={`${current}`}>
        {props.currentPage && <i className="fas fa-arrow-right"></i>}
        {props.children}
      </div>
      {props.parent && <i className={`fa ${caretClass}`} />}
    </div>
  );
};

export default MenuItem;
