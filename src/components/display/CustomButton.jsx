import React from 'react'
import { Button } from 'reactstrap';
import Link from 'gatsby-link';

const styles = {
  button: {
    cursor: 'pointer'
  }
}

const CustomButton = (props) => {
  return (
    <div className="stc-btn btn btn-red" style={styles.button}>
      <Link to={ props.link }>{ props.anchor }</Link>
    </div>
  )
}

export default CustomButton;