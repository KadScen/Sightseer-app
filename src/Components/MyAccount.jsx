import React, {useState, useRef, memo, useEffect} from 'react';
import "./MyAccount.css";
import Cookies from 'js-cookie';
import {db} from "../Config/firebaseConfig";
import firebase from 'firebase/compat/app';
import { useDispatch } from "react-redux";
import { myAccount } from "../Actions";
import MainBody from './MainBody';
import EditProfilPic from './EditProfilPic';

export function MyAccount() {
    //Call and run signinup from Redux Actions
    const dispatch = useDispatch();
    dispatch(myAccount());
    const [currentUserData, setCurrentUserData] = useState(0);
    const timeStamp = useRef(0);
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
        Cookies.set('id', user.uid);
    });

    //Fetch the data from fb only once thanks to useEffect and fetchData = async()
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await db
                    .collection("Users")
                    .doc(Cookies.get('id'))
                    .get();
                let data = { title: 'not found' };

                if (response.exists) {
                    data = response.data();
                    timeStamp.current = response.data().registerDate.toDate().toDateString();
                }
                setCurrentUserData(data);

            } catch(err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="myAccountComponent">
            <div className="headerInfos">
                <img
                    src={currentUserData.profilPicture ? currentUserData.profilPicture : "https://assets.dryicons.com/uploads/icon/svg/3349/black_business_user.svg"}
                    alt={currentUserData.name}
                />
                <div>
                    <EditProfilPic/>
                </div>
                <p>Username: {currentUserData.name}</p>
                <p>Email: {currentUserData.email}</p>
                <p>Member since: {timeStamp.current}</p>
            </div>
            <div className="lastPostSeparator">
                <p>Your last posts: ...</p>
            </div>
            <div className="listOwnDeals">
                {Cookies.get('id') ? <MainBody getUserDealId={Cookies.get('id')}/> : <p>Loading...</p>}
            </div>
        </div>
    )
}

export default memo(MyAccount);