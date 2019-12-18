import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class BrandHeader extends Component {
    
    previousPage = () => {
        let url = this.props.url;
        return <Link to={this.props.history.push(url)}>Link</Link>
    }

    render() {
    return (
      <div className="side-menu-header">
        <button className="remove-btn back-link" onClick={this.previousPage}>
        <img src={`${process.env.REACT_APP_URL}/back.svg`}></img> 
        <span className="is-size-5 has-text-weight-medium	">Back</span>
        </button>
        {this.props.subtitle &&
          <h3 className="subtitle is-5 has-text-weight-semibold">{this.props.subtitle}</h3>
        }
        <h2 className="title is-2 has-text-weight-bold">{this.props.title}</h2>
      </div>
    );
  }
}
