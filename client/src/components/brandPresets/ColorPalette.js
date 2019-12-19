import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProjectService from '../../services/ProjectService';
import BrandHeader from '../layout/BrandHeader';
import SideMenu from '../layout/SideMenu';
import MainContent from '../layout/MainContent';
import AuthService from "../../services/AuthService";


export default class ColorPalette extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.projectService = new ProjectService();
    this.state = {
      path: '',
      title: '',
      colorPalette: null
    };
  }

  render() {
    const { id, path } = this.props.match.params;
    const { colorPalette, typeset, assets } = this.props;
    
    return (
      <>
        <SideMenu
          toggleMenu={this.props.toggleMenu}
          menuIsOpen={this.props.menuIsOpen}
        >
          <BrandHeader
            title='Color Palette'
            {...this.props}
            url={`/project/${id}/edit`}
          ></BrandHeader>

          <div className='content'>
            <div className='color-palette columns is-multiline'>
              {colorPalette &&
                colorPalette.map(color => (
                  <div className='column is-full box' key={color._id}>
                    <div className='color'>
                      <div
                        className='circle-color'
                        style={{ backgroundColor: color.hexadecimal }}
                      ></div>
                      <span>{color.name}</span>
                    </div>
                    <div className='is-grouped'>
                      <Link
                        to={`/project/${path}/edit/colorPalette/new/${color._id}`}
                        className='button is-rounded is-small is-success is-outlined'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => this.props.deleteColor(color._id)}
                        className='button is-rounded is-small is-danger is-outlined'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

              {!colorPalette ||
                (!colorPalette.length && (
                  <div>
                    You dont have any color swatch yet. Add your first now.
                  </div>
                ))}
            </div>

            <div className='control'>
              <Link
                to={`/project/${path}/edit/colorPalette/new`}
                className='button is-link'
              >
                Add new color
              </Link>
            </div>
          </div>
        </SideMenu>
        <MainContent
          {...this.props}
          colorPalette={colorPalette}
          toggleMenu={this.props.toggleMenu}
          menuIsOpen={this.props.menuIsOpen}
          user={this.props.loggedInUser}
          typeset={typeset}
          assets={assets}
        >
          
        </MainContent>
      </>
    );
  }
}
