import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class BrandHeader extends Component {
    
    previousPage = () => {
        return <Link to={this.props.history.goBack()}>Link</Link>
    }

    render() {
    return (
      <div>
        <button onClick={this.previousPage}>Go back, girrrl</button>
        {this.props.subtitle &&
          <h3 className="subtitle is-4 has-text-weight-bold">{this.props.subtitle}</h3>
        }
        <h2 className="title is-1">{this.props.title}</h2>
      </div>
    );
  }
}
