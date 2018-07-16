import React from "react";
import firebase from "../../firebase/init";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
// eslint-disable-next-line
import { theme, withStyles } from "@material-ui/core/styles";

import "../../assets/sass/image_uploader.scss";

const styles = theme => ({
  header: {
    display: "flex"
  },
  button: {
    cursor: "pointer",
    background: theme.palette.primary.main,
    display: "flex",
    padding: "8px 16px",
    borderRadius: "2px",
    "&:hover, &:focus": {
      background: theme.palette.primary.dark
    },
    marginBottom: "1rem"
  },
  action: {
    display: "flex"
  },
  text: {
    fontWeight: "bold",
    marginLeft: "4px"
  },
  icon: {
    marginRight: "10px",
    color: "#e70094"
  }
});

class FileUploadEditor extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { content: this.props.content, loading: false };
    this.toggleEditing = () => this._toggleEditing();
    this.handleFileChange = image => this._handleFileChange(image);
    this.handleCaptionChange = val => this._handleCaptionChange(val);
    this.handleDoneEditing = () => this._handleDoneEditing();
  }

  _handleCaptionChange(event) {
    const title = event.currentTarget.value;
    this.setState({
      content: {
        ...this.state.content,
        title: title
      }
    });
  }

  _handleFileChange(event) {
    this.setState({ loading: true });
    const file = event.target.files[0];
    const splitName = file.name.split(".");
    const filetype = splitName[splitName.length - 1];

    const fileRef = firebase
      .storage()
      .ref()
      .child(`files/${file.name}`);

    fileRef.put(file).then(snapshot => {
      this.setState({
        content: {
          ...this.state.content,
          filepath: snapshot.downloadURL,
          filetype: filetype
        },
        preview: snapshot.downloadURL,
        loading: false
      });
    });
  }

  render() {
    const { title, filepath, filetype } = this.state.content;

    return (
      <div className="image-uploader-container">
        <Grid container justify="center">
          <Grid item>
            <label className={this.props.classes.button}>
              <Typography variant="button">Select file</Typography>
              <input
                type="file"
                hidden={true}
                onChange={this.handleFileChange}
              />
            </label>
          </Grid>
          <Grid item xs={12}>
            {this.state.loading && (
              <div className="loader-container">
                <div className="loader">loading...</div>
              </div>
            )}
            {this.state.preview && (
              <div
                className={this.props.classes.action}
              >
                <span>{`Preview: `}</span>
                <a
                  href={filepath}
                  className={this.props.classes.text}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title} {filetype && `(${filetype})`}
                </a>
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <TextField
                className="form-control"
                name="title"
                value={title || ""}
                label={"Title to display"}
                onChange={this.handleCaptionChange}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(FileUploadEditor);
