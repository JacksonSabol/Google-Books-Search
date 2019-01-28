import React from "react";
import "../../index.css";

function Jumbotron({ children }) {
  return (
    <div
      className="jumbotron"
    >
      <p class="jumbotron__heading">Google Book Search</p>
      <p class="jumbotron__subheading">Search for and Save Books of Interest</p>
      {children}
    </div>
  );
}

export default Jumbotron;
