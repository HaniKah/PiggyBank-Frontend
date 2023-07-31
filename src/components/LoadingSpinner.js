import React from "react";
import loadingSpinner from "./svgCategories/loadingSpinner.gif";

export default function LoadingSpinner() {
  return (
    <div className="spinner-div">
      <img className="spinner" src={loadingSpinner} alt="spinner" />
      <h5 className="loading-txt">Loading ...</h5>
    </div>
  );
}
