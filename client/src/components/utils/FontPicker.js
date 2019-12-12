import React, { Component } from "react";
import FontPicker from "font-picker-react";
 
export default class MyFontPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFontFamily: "Open Sans",
        };
    }
 
    render() {
        return (
            <div>
                <FontPicker
                    apiKey="AIzaSyDVV8UzZpl7rfmgO7J7Xze17Vc_cmtS42s"
                    activeFontFamily={this.state.activeFontFamily}
                    onChange={nextFont =>
                        this.setState({
                            activeFontFamily: nextFont.family,
                        })
                    }
                />
                <p className="apply-font">The font will be applied to this text.</p>
            </div>
        );
    }
}