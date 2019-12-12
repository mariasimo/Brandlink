import React, { Component } from "react";
import FontPicker from "font-picker-react";

export default class MyFontPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontFamily: "Open Sans",
      type : "Google Fonts"
    };
  }

  recordType = nextFont => {
    this.setState({
      ...this.state,
      fontFamily: nextFont.family,
    });
  };


  render() {
    // todo: .env not working on client side
    // console.log(process.env.REACT_APP_GFONTS_KEY)
    return (
      <div className="font-picker">

        <FontPicker
          limit="100"
          apiKey="AIzaSyDVV8UzZpl7rfmgO7J7Xze17Vc_cmtS42s"
          activeFontFamily={this.state.fontFamily}
          onChange={nextFont => this.recordType(nextFont)}
        />

        <div className="container is-fullhd preview-text">
          <div className="notification apply-font">
            The font will be applied to this text.
          </div>
        </div>

        <button onClick={() => this.props.saveType(this.state)} className="button is-link">Save Type</button>

      </div>
    );
  }
}
