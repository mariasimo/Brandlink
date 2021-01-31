import React from "react";
import { useHistory } from "react-router-dom";

const BrandHeader = ({ title, subtitle, url }) => {
  const history = useHistory();
  const goBack = () => history.push(url);

  return (
    <div className="side-menu-header">
      <button className="remove-btn back-link" onClick={goBack}>
        <img src={`${process.env.REACT_APP_URL}/back.svg`} alt="go back"></img>
        <span className="is-size-5 has-text-weight-medium	">Back</span>
      </button>
      {subtitle && (
        <h3 className="subtitle is-5 has-text-weight-semibold">{subtitle}</h3>
      )}
      <h2 className="title is-2 has-text-weight-bold">{title}</h2>
    </div>
  );
};

export default BrandHeader;
