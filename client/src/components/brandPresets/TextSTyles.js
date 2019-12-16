import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProjectService from '../../services/ProjectService';
import BrandHeader from '../layout/BrandHeader';
import SideMenu from '../layout/SideMenu';
import MainContent from '../layout/MainContent';

export default class TextStyles extends Component {
  constructor(props) {
    super(props);
    this.projectService = new ProjectService();
    this.state = {
      path: '',
      title: '',
      typeset: [],
      textstyles: []
    };
  }

  fetchOneProject = () => {
    const path = this.props.match.params.path;
    this.projectService.fetchOneProject(path).then(project => {
      this.setState({
        ...this.state,
        ...project
      });
    });
  };

  componentDidMount() {
    this.fetchOneProject();
  }

  render() {
    const { path } = this.props.match.params;
    const { textstyles } = this.state;

    return (
      < >
      <SideMenu
        toggleMenu={this.props.toggleMenu}
        menuIsOpen={this.props.menuIsOpen}
      >
        <BrandHeader
          title='Text Styles'
          {...this.props}
          url={`/project/${path}/edit`}
        ></BrandHeader>
        <div className='content'>
          <div className='type-set columns is-multiline'>
            {textstyles && 
            <p>This are some default styles you cant edit</p>}
            {textstyles &&
              textstyles.map(style => (
                <div className='column is-full box' key={style._id}>
                  <div className='element'>
                    <span
                      style={{
                        fontFamily: style.fontFamily,
                        fontWeight: style.fontWeight,
                        fontSize: `${style.fontSize}rem`,
                        letterSpacing: `${style.letterSpacing}rem`,
                        lineHeight: style.lineHeight
                      }}
                    >
                      {style.name}
                    </span>
                  </div>
                  <div className='is-grouped'>
                    <Link
                      to={{
                        pathname: `${this.props.location.pathname}/new/${style._id}`,
                        state: this.state
                      }}
                      className='button is-rounded is-small is-success is-outlined'
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}

            {!textstyles && <div>You dont have any text styles yet</div>}
          </div>

          {/* <div className="field fonts-buttons is-group">
                  <div className="control">
                    <Link
                      to={`${this.props.location.pathname}/new/}`}
                      className="button is-link"
                    >
                      Add New Text Style
                    </Link>
                  </div>
                </div> */}
        </div>
      </SideMenu>
      <MainContent
          toggleMenu={this.props.toggleMenu}
          menuIsOpen={this.props.menuIsOpen}
        >
          Holi
        </MainContent>
        </ >
    );
  }
}
