import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import style from "./TopNavigation.module.scss";
import careAILogo from "../../img/logo/care bear.png";

const TopNavigation = () => {
  const location = useLocation();

  return (
    <div className={style.navWrap}>
      <NavLink to="/" className={style.logoWrp}>
        <div className={style.leftLogoWrp}>
          <div className={style.leftLogo}>
            <img src={careAILogo} alt="care bear" />
          </div>
          <h1>CARE BEAR AI</h1>
        </div>
      </NavLink>
      <nav>
        <ul>
          <li className={location.pathname === "/" ? style.activeLink : ""}>
            <NavLink to="/" exact>
              Home
            </NavLink>
          </li>
          <li
            className={
              location.pathname === "/data-exploration" ? style.activeLink : ""
            }
          >
            <NavLink to="/data-exploration">Data Exploration</NavLink>
          </li>
          {/* <li
            className={
              location.pathname === "/model-selection" ? style.activeLink : ""
            }
          >
            <NavLink to="/model-selection">Model Selection</NavLink>
          </li> */}
          {/* <li
            className={
              location.pathname === "/predictions" ? style.activeLink : ""
            }
          >
            <NavLink to="/predictions">Predictions</NavLink>
          </li> */}
          <li
            className={
              location.pathname === "/performance-analysis"
                ? style.activeLink
                : ""
            }
          >
            <NavLink to="/performance-analysis">About</NavLink>
          </li>
          <li
            className={location.pathname === "/reports" ? style.activeLink : ""}
          >
            <NavLink to="/reports">Login</NavLink>
          </li>
        </ul>
      </nav>
      {/* <div className={style.rightExt}></div> */}
    </div>
  );
};

export default TopNavigation;
