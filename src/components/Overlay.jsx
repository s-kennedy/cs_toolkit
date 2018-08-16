import React from "react";
import { connect } from "react-redux";


const Overlay = props => {
  const classes = props.showOverlay ? "overlay show" : "overlay";
  return <div className={classes} />
}

const mapStateToProps = state => {
  return {
    showOverlay: state.overlay.show
  }
}

export default connect(mapStateToProps, null)(Overlay);