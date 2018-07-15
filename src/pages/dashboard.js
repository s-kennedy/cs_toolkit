import React from "react";
import Link from "gatsby-link";
import { connect } from "react-redux";
import { map } from "lodash";

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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
