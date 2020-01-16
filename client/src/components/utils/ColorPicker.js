import React from 'react';
import { TwitterPicker } from 'react-color';

export default class ColorPicker extends React.Component {
  state = {
    background: '#fff',
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex }, () => console.log(this.state));
  };

  render() {
    return (
      <TwitterPicker
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
      />
    );
  }
}