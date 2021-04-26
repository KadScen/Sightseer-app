import React from "react";
import { MdSwapVert } from "react-icons/md";
import { useDispatch } from "react-redux";
import { card } from "../Actions";
import {useLocation} from "react-router-dom";
import Carousel from './Carousel';
import AddLike from './AddLike';

import "./Card.css";

function Card() {
  //Call and run signinup from Redux Actions
  const dispatch = useDispatch();
  dispatch(card());
  let location = useLocation();

  return (
    <div className="cardComponent">
      <div className="cardHeader">
        <div className="userInfos">
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/3349/black_business_user.svg"
            alt="userPic"
          />
          <p>{location.dealCreator}</p>
        </div>
        <div className="interestInfos">
          <AddLike dealData={location.state}/>
          <MdSwapVert size="30px" />
        </div>
      </div>
      <div className="cardBody">
        {location.state.imageUrl === 'false' ?
          <div className="noImage">
            <p>There is no image added to this deal...</p>
          </div>
          :  
          <div>
            <Carousel imageData={location}/>
          </div>
        }
      </div>
      <div className="cardFooter">
        <div className="activityInfos">
          <p className="dealTitle">{location.state.dealName}</p>
          <p className="dealPrice">Price: ${location.state.dealPrice}</p>
          <p>Location: {location.state.dealLocation}</p>
        </div>
        <div className="dealDescription">
          <p className="descriptionSubtitle">Desctiption of the deal: <br/></p>
          <p>{location.state.dealDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
