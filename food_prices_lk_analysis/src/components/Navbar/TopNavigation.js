import React from "react";
import { Link } from "react-router-dom";

const TopNavigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/data-exploration">Data Exploration</Link>
        </li>
        <li>
          <Link to="/model-selection">Model Selection</Link>
        </li>
        <li>
          <Link to="/predictions">Predictions</Link>
        </li>
        <li>
          <Link to="/performance-analysis">Performance Analysis</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopNavigation;
