import React from "react";
import Link from "gatsby-link";
import { Container, Row, Col } from 'reactstrap';
import { connect } from "react-redux";
import { map } from "lodash";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";

const Dashboard = props => {
  const tools = props.user ? props.user.interactive_tools : {}

  return (
    <div className={`basic-page dashboard`}>
      <Grid container>
        <Grid item xs={12}>
          <div className="title">
            <h1>Dashboard</h1>
            {props.user && <h3 className="teal">{props.user.displayName}</h3>}
          </div>
        </Grid>
      </Grid>

      <Grid container justify={"center"}>
        <Grid item xs={12} sm={10} md={8}>
          <div>
            <h4>Your interactive tools</h4>
          </div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="dense">
                    Tool
                  </TableCell>
                  <TableCell padding="dense">
                    Title
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  map(tools, (tool, uid) => {
                    const type = tool.toolType ? tool.toolType : 'Unknown Tool'
                    return (
                      <TableRow key={uid}>
                        <TableCell
                          padding="dense"
                        >
                          {type}
                        </TableCell>
                        <TableCell
                          padding="dense"
                        >
                          <Link to={`${tool.slug}?id=${uid}`}>
                            {tool.title}
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.adminTools.user
  };
};

export default connect(mapStateToProps, null)(Dashboard);
