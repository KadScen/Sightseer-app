import React, {useState, useEffect} from "react";
import { MdSwapVert } from "react-icons/md";
import { useDispatch } from "react-redux";
import { card } from "../Actions";
import {useLocation} from "react-router-dom";
import Carousel from './Carousel';
import firebase from 'firebase/app';

import "./Card.css";

function Card() {
  // const [dealCreatorInfo, setdealCreatorInfo] = useState([]);
  //Call and run signinup from Redux Actions
  const dispatch = useDispatch();
  dispatch(card());

  let location = useLocation();
  console.log('location is: ' + location.state);

  // useEffect(() => {
  //   //Get post user infos
  //   const db = firebase.firestore();
  //   const docRef = db.collection("Users").doc(location.state.dealUserCreator);

  //   docRef.get().then((doc) => {
  //       if (doc.exists) {
  //           console.log("Document data:", doc.data());
  //           setdealCreatorInfo(doc.data());
  //       } else {
  //           // doc.data() will be undefined in this case
  //           console.log("No such document!");
  //       }
  //   }).catch((error) => {
  //       console.log("Error getting document:", error);
  //   });
  // })

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
          <p>Interest level</p>
          <MdSwapVert size="30px" />
        </div>
      </div>
      <div className="cardBody">
        {location.state.imageUrl == 'false' ?
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
