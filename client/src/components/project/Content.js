import React, { Component } from 'react';

export class Content extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {

  }

  render() {
    const { path, slot }  = this.props
    return (
    <div>Generic content: {slot.order}

      {!slot.colorPalette.length && 
      <p>You have no colors declared in your palette. <a href={`/project/${path}/edit/ColorPalette/new`}>Add one</a></p>}
    
      {slot.colorPalette.length && 
     slot.colorPalette.map(color => 
        <div className='color'>
        <div
          className='circle-color'
          style={{ backgroundColor: color.hexadecimal }}
        ></div>
        <span>{color.name}</span>
        </div>)}
    </div>
    );
  }
}

export class Image extends Content {
  render() {
    return <img src={this.props.url} alt={this.props.name}></img>;
  }
}

export class TextField extends Content {
  render() {
    return (
      // Hero goes my Dante component
      <div>Dante component</div>
    );
  }
}

export class ColorPalette extends Content {
  render() {
    const { colorPalette } = this.props;
    return (
      // Hero goes my Dante component
      <React.Fragment>
        {colorPalette.map(color => 
          <div className='color'>
            <div
              className='circle-color'
              style={{ backgroundColor: color.hexadecimal }}
            ></div>
            <span>{color.name}</span>
          </div>
        )}
      </React.Fragment>
    );
  }
}
