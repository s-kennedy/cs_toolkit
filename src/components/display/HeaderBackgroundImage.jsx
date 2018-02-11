import React from 'react';
import { connect } from 'react-redux'
import { Jumbotron } from 'reactstrap';

import img from '../assets/img/home_header.jpg';

const HeaderBackgroundImage = (props) => {
  const styles = {
    jumbotron: {
      display: 'flex',
      background: `url(${props.source || img}) no-repeat center center`,
      backgroundSize: 'cover',
      height: '65vh',
      minHeight: '440px',
      alignItems: 'flex-end'
    }
  }
  return (
    <Jumbotron style={styles.jumbotron}>
      {props.children}
    </Jumbotron>
  )
}

export default HeaderBackgroundImage