import React from "react";
import { MdSwapVert } from "react-icons/md";
import { useDispatch } from "react-redux";
import { card } from "../Actions";
import {Link, useLocation} from "react-router-dom";
import Carousel from './Carousel';

import "./Card.css";

function Card() {
  //Call and run signinup from Redux Actions
  const dispatch = useDispatch();
  dispatch(card());

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
        <Carousel imageData={location}/>
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
