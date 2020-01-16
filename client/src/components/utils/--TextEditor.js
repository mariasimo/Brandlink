import React, { Component } from 'react';
import Dante from 'Dante2';

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  save_handler = (editorContext, content) => {
    this.setState({ content });
  };

  render() {
    let danteProps = {
      data_storage: {
        url: '/save-editor-content',
        save_handler: this.save_handler
        // success_handler: console.log("succes_handler"),
        // failure_handler: console.log("failure"),
        // url: "/save-editor-content",
        // method: "POST",
        // interval: 1500,
        // withCredentials: false,
        // crossDomain: false,
        // headers: {}
      }
    };

    let contentState = {};
    try {
    //   contentState = convertFromRaw(this.state.content);
    } catch (e) {}

    console.log(this.state);

    return (
      <div>
        <Dante {...danteProps} />
      </div>
    );
  }
}
