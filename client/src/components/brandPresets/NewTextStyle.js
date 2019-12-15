import React, { Component } from "react";
import ProjectService from "../../services/ProjectService";
import BrandHeader from "../layout/BrandHeader";

export default class NewTextStyle extends Component {
  render() {
    const { path } = this.props.match.params;
    const { typeset } = this.props.location;

    console.log(typeset);
    return (
      <section className="section">
        <div className="container columns">
          <div className="column is-third">
            <div className="side-menu">
              <BrandHeader
                title="Text Styles"
                subtitle="Heading 1"
                {...this.props}
                url={`/project/${path}/edit/textStyles`}
              ></BrandHeader>

              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label htmlFor="fontFamily" className="label">
                    Font Family:
                  </label>
                  <div className="control">
                    {typeset && (
                      <select className="select large" name="fontFamily">
                        {typeset.map(font => {
                          return (
                            <option value="font.fontFamily">
                              {font.fontFamily}
                            </option>
                          );
                        })}
                      </select>
                    )}

                    {!typeset && (
                      <p>You haven't add any font to TypeSet yet. Go now</p>
                    )}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="fontWeight" className="label">
                    Font Weight:
                  </label>
                  <div className="control">
                      <select className="select large" name="fontWeight">
                       <option value="100">Light</option>
                       <option value="400">Regular</option>
                       <option value="500">Semibold</option>
                       <option value="600">Bold</option>
                      </select>

                    {/* for this to work right i will new to now what font family is 
                    going to be in user, and retrieve the weights avaibable for it from Google
                    Fonts or Adobe Fonts (or custom source, if i get to implement that) */}
                  </div>
                </div>

                <div className="field">
                    <label htmlFor="fontSize" className="label">
                        Font Size:
                    </label>
                    <div className="control">
                        <input type="range" name="fontSize" minLength="1" maxLength="10"/>
                        <span>Result in rem</span>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="lineHeight" className="label">
                        Line Height: 
                    </label>
                    <div className="control">
                        <input type="range" name="lineHeight" minLength="0" maxLength="2" steps="20"/>
                        <span>Result</span>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="letterSpacing" className="label">
                        Letter Spacing
                    </label>
                    <div className="control">
                        <input type="range" name="letterSpacing" minLength="0" maxLength="5" steps="5"/>
                        <span>Result</span>
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <input type="checkbox"/>
                        <span>Text to uppercase</span>
                    </div>
                </div>


                <div className="control">
                  <input
                    type="submit"
                    className="button is-link"
                    value="Save Text Style"
                  ></input>
                </div>
              </form>
            </div>
          </div>
          <div className="column is-two-thirds projects-wrapper"></div>
        </div>
      </section>
    );
  }
}
