import React, { Component } from 'react';

export default class Dropdown extends Component {
  render() {
    const { row, slotIdx } = this.props;
    return (
      <div className='dropdown is-hoverable'>
        <div className='dropdown-trigger'>
          <button
            className='button'
            aria-haspopup='true'
            aria-controls='dropdown-menu4'
          >
            <span>Add content</span>
            <span className='icon is-small'>
              <img src={`${process.env.REACT_APP_URL}/chevron-down.svg`}></img>
            </span>
          </button>
        </div>
        <div className='dropdown-menu' id='dropdown-menu4' role='menu'>
          <div className='dropdown-content'>
            <div className='dropdown-item'>
              <div>
                <button onClick={this.addContent} className='button'>
                  Text editor
                </button>
              </div>
              <div>
                <button
                  onClick={() => this.props.addContent()}
                  className='button'
                >
                  Color Palette
                </button>
              </div>
              <div>
                <button onClick={this.addContent} className='button'>
                  Image
                </button>
              </div>
              <div>
                <button onClick={this.addContent} className='button'>
                  Typography display
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
