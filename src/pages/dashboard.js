import React from "react";
import { Link } from "gatsby";
import { connect } from "react-redux";
import { map } from "lodash";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Layout from '../layouts/index';

const Dashboard = props => {
  const tools = props.user ? props.user.interactive_tools : {};

  return (
    <Layout>
      <div className={`basic-page dashboard`}>
        <Grid container justify="center">
          <Grid item xs={12} className="title">
            <Typography variant="display1" gutterBottom>Dashboard</Typography>
            {props.user && (
              <Typography color="primary" variant="display3" gutterBottom>
                {props.user.displayName}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={8}>
            <div>
              <Typography variant="display4" gutterBottom>Your interactive tools</Typography>
            </div>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="dense">Tool</TableCell>
                    <TableCell padding="dense">Title</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {map(tools, (tool, uid) => {
                    const type = tool.toolType ? tool.toolType : "Unknown Tool";
                    return (
                      <TableRow key={uid}>
                        <TableCell padding="dense">{type}</TableCell>
                        <TableCell padding="dense">
                          <Link to={`${tool.slug}?id=${uid}`}>{tool.title}</Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    user: state.adminTools.user
  };
};

export default connect(mapStateToProps, null)(Dashboard);
