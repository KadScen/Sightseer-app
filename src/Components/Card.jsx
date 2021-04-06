import React from "react";
import { MdSwapVert } from "react-icons/md";
import { useDispatch } from "react-redux";
import { card } from "../Actions";
import M from "materialize-css";
import {Link, useLocation} from "react-router-dom";

import "./Card.css";

function Card() {
  //Call and run signinup from Redux Actions
  const dispatch = useDispatch();
  dispatch(card());

  document.addEventListener("DOMContentLoaded", function () {
    const elems = document.querySelectorAll(".carousel");
    M.Carousel.init(elems);
  });

  let location = useLocation();
console.log(location);

  return (
    <div className="cardComponent">
      <div className="cardHeader">
        <div className="userInfos">
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/3349/black_business_user.svg"
            alt="userPic"
          />
          <p>User name</p>
        </div>
        <div className="interestInfos">
          <p>Interest level</p>
          <MdSwapVert size="30px" />
        </div>
      </div>
      <div className="cardBody">
        <div className="carousel">
          <a className="carousel-item" href="/">
            <img alt="" src="https://www.vancouvertrails.com/images/hikes/quarry-rock.jpg" />
          </a>
          <a className="carousel-item" href="/">
            <img alt="" src="https://www.vancouvertrails.com/images/photos/quarry-rock-1.jpg" />
          </a>
          <a className="carousel-item" href="/">
            <img alt="" src="https://www.vancouvertrails.com/images/photos/quarry-rock-2.jpg" />
          </a>
          <a className="carousel-item" href="/">
            <img alt="" src="https://www.vancouvertrails.com/images/photos/quarry-rock-3.jpg" />
          </a>
          <a className="carousel-item" href="/">
            <img alt="" src="https://www.vancouvertrails.com/images/photos/quarry-rock-4.jpg" />
          </a>
        </div>
      </div>
      <div className="cardFooter">
        <div className="activityInfos">
          <p>{location.state.dealName}</p>
          <p>Location: {location.state.dealLocation}</p>
          <p>Price: ${location.state.dealPrice}</p>
        </div>
        <div>
          <p>{location.state.dealDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
