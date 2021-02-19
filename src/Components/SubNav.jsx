import React from "react";
import { useSelector } from "react-redux";

function SubNav() {
  const location = useSelector((state) => state.subNavLoc);
  return (
    <div className="subNavComponent">
      <nav>
        <div className="nav-wrapper">
          <div className="col s12">
            <a href="/#" className="breadcrumb" style={{marginLeft: "20px"}}>
              Home
            </a>
            <a href="/#" className="breadcrumb">
              {location}
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SubNav;
