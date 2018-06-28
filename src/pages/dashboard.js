import React from "react";
import Link from "gatsby-link";
import { Container, Row, Col } from 'reactstrap';
import { connect } from "react-redux";
import { map } from "lodash";

const Dashboard = props => {
  const tools = props.user ? props.user.interactive_tools : {}

  return (
    <div className={`basic-page dashboard`}>
      <Container>
        <Row>
          <Col xs={12}>
            <div className="title">
              <h1>Dashboard</h1>
              {props.user && <h3 className="teal">{props.user.displayName}</h3>}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <div>
              <h4>Your interactive tools</h4>
            </div>
            {
              map(tools, (tool, uid) => {
                const type = tool.toolType ? tool.toolType : 'Unknown Tool'
                return (
                  <div key={uid}>
                    <span className="tool-type">{type} - </span>
                    <Link to={`${tool.slug}?id=${uid}`}>
                      {tool.title}
                    </Link>
                  </div>
                )
              })
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.adminTools.user
  };
};

export default connect(mapStateToProps, null)(Dashboard);
