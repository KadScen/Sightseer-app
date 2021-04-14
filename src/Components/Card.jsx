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
  console.log('location is: ' + location);

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
