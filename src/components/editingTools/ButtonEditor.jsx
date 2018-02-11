import React from 'react'
import EditorWrapper from './EditorWrapper';

const styles = {
  label: {
    color: 'inherit'
  },
  input: {
    marginLeft: '10px'
  }
}

class ButtonEditor extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = { anchor: this.props.anchor, link: this.props.link }
    this.handleAnchorChange = (event) => this._handleAnchorChange(event)
    this.handleLinkChange = (event) => this._handleLinkChange(event)
    this.handleDoneEditing = () => this._handleDoneEditing();
  }

  _handleAnchorChange (event) {
    const anchor = event.currentTarget.value;
    this.setState({ anchor });
  };

  _handleLinkChange (event) {
    const link = event.currentTarget.value;
    this.setState({ link });
  };

  _handleDoneEditing() {
    this.props.doneEditing({ anchor: this.state.anchor, link: this.state.link })
  }


  render() {
    const { anchor, link } = this.state;

    return (
      <EditorWrapper handleDoneEditing={this.handleDoneEditing}>
        <div>
          <label htmlFor='anchor' style={styles.label}>Button text</label>
          <input
            name='anchor'
            value={ anchor }
            onChange={this.handleAnchorChange}
            style={styles.input}
          />
        </div>
        <div>
          <label htmlFor='link' style={styles.label}>Link path</label>
          <input
            name='link'
            value={ link }
            onChange={this.handleLinkChange}
            style={styles.input}
          />
        </div>
      </EditorWrapper>
    )
  }
};

export default ButtonEditor;