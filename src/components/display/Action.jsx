import React from 'react';
import Link from 'gatsby-link';

const styles = {
  text: {
    fontWeight: 'bold'
  }
}
const Action = (props) => {
  return (
    <div className="action-link">
      <Link to={props.link}>
        <p style={styles.text}>{props.anchor}</p>
      </Link>
    </div>
  )
}

export default Action;