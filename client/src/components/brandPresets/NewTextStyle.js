import React, { Component } from "react";
import ProjectService from "../../services/ProjectService";
import BrandHeader from "../layout/BrandHeader";
import SideMenu from "../layout/SideMenu";
import MainContent from "../layout/MainContent";

export default class NewTextStyle extends Component {
  constructor(props) {
    super(props);
    this.projectService = new ProjectService();

    this.state = {
      textstyle: {},
      typeset: []
    };

    this.uppercaseValue = "none";
  }

  componentDidMount() {
    this.getTextStyleData();
  }

  getTextStyleData = () => {
    const { styleId } = this.props.match.params;
    console.log(styleId)

    if (styleId !== undefined) {
      this.projectService.getTextStyleData(styleId)
      .then(textstyleData => {

          console.log(textstyleData)

          let textStyle = textstyleData.textstyles.filter(
            style => style._id === styleId
          );
          
          this.setState({
            ...this.state,
            textstyle: textStyle[0],
            typeset : textstyleData.typeset
          });
        },
        error => {
          const { message } = error;
          console.error(message);
        }
      );
    }
  };


  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ 
      ...this.state,  textstyle : { ...this.state.textstyle, [name]: value }});
  };

  handleCheckbox = e => {
    let uppercase = !this.state.uppercase;
    this.setState({ ...this.state, uppercase: uppercase });
    this.uppercaseValue = !this.state.uppercase ? "uppercase" : "none";
  };

  handleSubmit = e => {
    e.preventDefault();
    const { path, styleId } = this.props.match.params;
    const { history } = this.props;
    const textstyle = this.state.textstyle

    this.props.addTextStyle({ textstyle, path, styleId, history })
  };

  render() {
    const { id } = this.props.match.params;
    const {
      name,
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      letterSpacing
    } = this.state.textstyle;
    const { colorPalette, typeset, assets, textstyle} = this.props;

    console.log(this.props, this.state)

    return (
      < >
      <SideMenu toggleMenu={this.props.toggleMenu} menuIsOpen={this.props.menuIsOpen}>
            <BrandHeader
                title={name}
                subtitle="Text Styles"
                {...this.props}
                url={`/project/${id}/edit/textStyles`}
              ></BrandHeader>

              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <label htmlFor="fontFamily" className="label">
                    Font Family:
                  </label>
                  <div className="control">
                    {typeset && (
                      <select
                        className="select large"
                        name="fontFamily"
                        value={fontFamily}
                        onChange={this.handleChange}
                      >
                        <option
                          value="Select font family"
                        >
                          Select a font family
                        </option>
                        {typeset.map((font, idx) => {
                          return (
                            <option key={idx} value={font.fontFamily}>
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
                    <select
                      className="select large"
                      name="fontWeight"
                      value={fontWeight}
                      onChange={this.handleChange}
                    >
                      <option value="100">Light</option>
                      <option value="400">Regular</option>
                      <option value="500">Semibold</option>
                      <option value="600">Bold</option>
                      <option value="800">Black</option>
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
                    <input
                      type="range"
                      name="fontSize"
                      min="1"
                      max="12"
                      step="0.25"
                      value={fontSize}
                      onChange={this.handleChange}
                    />
                    <span>{fontSize} rem</span>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="lineHeight" className="label">
                    Line Height:
                  </label>
                  <div className="control">
                    <input
                      type="range"
                      name="lineHeight"
                      value={lineHeight}
                      onChange={this.handleChange}
                      min="0"
                      max="2"
                      step="0.1"
                    />
                    <span>{lineHeight}</span>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="letterSpacing" className="label">
                    Letter Spacing
                  </label>
                  <div className="control">
                    <input
                      type="range"
                      name="letterSpacing"
                      min="-0.25"
                      max="0.25"
                      step="0.1"
                      value={letterSpacing}
                      onChange={this.handleChange}
                    />
                    <span>{letterSpacing} rem</span>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <input
                      type="checkbox"
                      name="uppercase"
                      onChange={this.handleCheckbox}
                    />
                    <span>Text to uppercase</span>
                  </div>
                </div>

                <div className="preview-text box">
                  <p
                    style={{
                      fontFamily,
                      fontSize: `${fontSize}rem`,
                      fontWeight,
                      lineHeight,
                      letterSpacing: `${letterSpacing}rem`,
                      textTransform: this.uppercaseValue
                    }}
                  >
                    Lorem ipsum dolor sit amet consecteteur adipiscing elit
                  </p>
                </div>

                <div className="control">
                  <input
                    type="submit"
                    className="button is-link"
                    value="Save Text Style"
                  ></input>
                </div>
              </form>
      </SideMenu>
      <MainContent
      {...this.props}
          toggleMenu={this.props.toggleMenu}
          menuIsOpen={this.props.menuIsOpen}
          path={this.props.match.params.path}
          user={this.props.loggedInUser}
          colorPalette={colorPalette}
          typeset={typeset}
          assets={assets}
        >
          
        </MainContent>
            </ >
    );
  }
}
