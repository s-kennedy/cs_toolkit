import React from 'react'
import Link from 'gatsby-link';

const styles = {
  button: {
    cursor: 'pointer'
  }
}

const CustomButton = (props) => {
  const externalLink = props.link.startsWith('https://') || props.link.startsWith('http://');

  if (externalLink) {
    return (
      <div className="stc-btn btn btn-red" style={styles.button}>
        <a href={ props.link } target='_blank'>{ props.anchor }</a>
      </div>
    )
  }

  return (
    <div className="stc-btn btn btn-red" style={styles.button}>
      <Link to={ props.link }>{ props.anchor }</Link>
    </div>
  )
}

export default CustomButton;