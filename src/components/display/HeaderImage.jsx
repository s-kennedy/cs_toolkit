import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import defaultImage from '../../assets/img/home_header.jpg';


const HeaderImage = (props) => {
  const styles = {
    jumbotron: {
      display: 'flex',
      background: `url(${props.image}) no-repeat center center`,
      backgroundSize: 'cover',
      height: props.height,
      minHeight: '440px',
      alignItems: 'flex-end'
    }
  }
  return (
    <Jumbotron style={styles.jumbotron} fluid>
      <Container fluid>
        {props.children}
      </Container>
    </Jumbotron>
  )
}

export default HeaderImage;