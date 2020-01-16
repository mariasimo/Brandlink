import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { };
      
        const content = window.localStorage.getItem('content');
      
        if (content) {
          this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
        } else {
          this.state.editorState = EditorState.createEmpty();
        }
      }

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({
      editorState,
    });
  };

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState));
  }

  saveContent = (content) => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  }

  render() {
    return (
      <div>
        <button onClick={this.onUnderlineClick}>Underline</button>
        <button onClick={this.onToggleCode}>Code Block</button>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default TextEditor;