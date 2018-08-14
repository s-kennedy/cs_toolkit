import React from "react";
// import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { connect } from "react-redux";
import { map, find } from "lodash";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/RemoveCircle'

import Layout from '../layouts/index';
import { deleteInteractiveTool, deleteBookmark, deleteComment, getCommentsByUser } from '../redux/actions';

const styles = {
  container: {
    marginBottom: '2rem',
  }
}

class Dashboard extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.getCommentsByUser(nextProps.user.uid);
    }
  }

  render() {
    const {props} = this;
    const tools = (props.user && props.user.interactive_tools) ? props.user.interactive_tools : {};
    const bookmarks = (props.user && props.user.bookmarks) ? props.user.bookmarks : {};
    const comments = props.comments || {};

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

          <Grid container justify="center" style={styles.container}>
            <Grid item xs={12} md={10}>
              <div>
                <Typography variant="display4" gutterBottom>Bookmarked pages</Typography>
              </div>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="dense">Page</TableCell>
                      <TableCell padding="dense">Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {map(bookmarks, (bookmark, uid) => {
                      const page = find(props.pages, (p) => p.node.id === uid)
                      if (page) {
                        return (
                          <TableRow key={uid}>
                            <TableCell padding="dense">
                              <a href={`/${page.node.slug}`}>{page.node.title}</a>
                            </TableCell>
                            <TableCell padding="dense">
                              <IconButton onClick={() => props.deleteBookmark(uid)}>
                                <RemoveIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>

          <Grid container justify="center" style={styles.container}>
            <Grid item xs={12} md={10}>
              <div>
                <Typography variant="display4" gutterBottom>Interactive tools</Typography>
              </div>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="dense">Tool</TableCell>
                      <TableCell padding="dense">Title</TableCell>
                      <TableCell padding="dense">Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {map(tools, (tool, uid) => {
                      const type = tool.toolType ? tool.toolType : "Unknown Tool";
                      return (
                        <TableRow key={uid}>
                          <TableCell padding="dense">{type}</TableCell>
                          <TableCell padding="dense">
                            <a href={`${tool.slug}?id=${uid}`}>{tool.title}</a>
                          </TableCell>
                          <TableCell padding="dense">
                            <IconButton onClick={() => props.deleteInteractiveTool(uid)}>
                              <RemoveIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>

          <Grid container justify="center" style={styles.container}>
            <Grid item xs={12} md={10}>
              <div>
                <Typography variant="display4" gutterBottom>Comments</Typography>
              </div>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="dense">Page</TableCell>
                      <TableCell padding="dense">Comment</TableCell>
                      <TableCell padding="dense">Date</TableCell>
                      <TableCell padding="dense">Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {map(comments, (comment, uid) => {
                      const page = find(props.pages, (p) => p.node.id === comment.page)
                      const date = new Date(comment.timestamp).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric"
                      });
                      return (
                        <TableRow key={uid}>
                          <TableCell padding="dense">
                            <a href={`${page.node.slug}`}>{page.node.title}</a>
                          </TableCell>
                          <TableCell padding="dense">
                            {`"${comment.text}"`}
                          </TableCell>
                          <TableCell padding="dense">
                            {date}
                          </TableCell>
                          <TableCell padding="dense">
                            <IconButton onClick={() => props.deleteComment(uid)}>
                              <RemoveIcon />
                            </IconButton>
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
};

const mapStateToProps = state => {
  return {
    user: state.adminTools.user,
    comments: state.comments.comments,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteBookmark: id => {
      dispatch(deleteBookmark(id));
    },
    deleteInteractiveTool: id => {
      dispatch(deleteInteractiveTool(id))
    },
    deleteComment: id => {
      dispatch(deleteComment(id))
    },
    getCommentsByUser: id => {
      dispatch(getCommentsByUser(id))
    }
  }
}

const DashboardComponent = props => (
  <StaticQuery
    query={graphql`
      query {
        allPages {
          edges {
            node {
              id
              title
              slug
              page_type
              navigation {
                displayTitle
                group
                order
                nested {
                  id
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Dashboard { ...props} pages={data.allPages.edges} />
    )}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
