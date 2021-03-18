import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import firebase from 'firebase/app';
import {v4 as uuid} from 'uuid';

import { firebaseApp } from '../Config/firebaseConfig';
import './AddDeal.css';
import ImageUpload from './ImageUpload';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    input: {
      display: 'none',
    },
}));
//Init firebase DB
const db = firebase.firestore();

const options = [
    {value:'hiking', label:'Hiking'}, 
    {value:'sales', label:'Sales'}, 
    {value:'traveling', label:'Traveling'}, 
    {value:'other', label:'Other'}, 
];

export default function AddDeal() {
    const [selectedOption, setSelectedOption] = useState(null);
    const history = useHistory();
    const location = {
        pathname: '/',
        state: { fromDashboard: true }
    }
    // Fecth Redux infos
    const classes = useStyles();
    // infos contain the image irl
    const id = uuid();
    const [dealId, setDealId] = useState(id);
    // Take image infos from Redux's ImageUpload.jsx
    const imageInfos = useSelector((state) => state.imageInfos);
    // Make a ref of the image to read it's current state and be able to send it to the DB
    const imageRef = useRef(0);
    imageRef.current = imageInfos;

    useEffect(() => {
        const submitDeal = document.getElementById('submitDeal');
        const dealForm = document.getElementById('dealForm');
        const dealFile = document.getElementById('dealFile');

        submitDeal.addEventListener('click', (e) => loadEdit(e), false);
        function loadEdit(e) {
            const file = dealFile.files[0];
            const storageRef = firebaseApp.storage().ref();
            if (file !== undefined && dealForm.checkValidity()) {
                e.preventDefault();
                console.log("File uploaded");
                alert('Deal added with image thanks!!');
                db.collection("Deals").doc(id).set({
                    imageUrl: imageRef.current,
                    location: "to be defined"
                })
                .then(function() {
                    console.log("Document successfully written!");
                    history.push(location);
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            } else if (file === undefined && dealForm.checkValidity()) {
                e.preventDefault();
                //Send form in DB here
                alert('Deal added without image thanks!!');
                history.push(location);
            }
            e.stopImmediatePropagation();
        }
    })

    return (
        <div className="addDealComponent">
            <div className="loginDiv">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        {/* <!-- Tabs Titles --> */}
                        <h2 className="underlineHover">Add a deal</h2>

                        {/* <!-- Signup Form --> */}
                        <form id="dealForm">
                            <div className="inputField">
                                <input type="text" id="dealName" className="fadeIn second" name="dealName" placeholder="Deal name*" required />
                                <input type="text" id="dealLocation" className="fadeIn second" name="dealLocation" placeholder="Deal location*" required />
                                <Select defaultvalue={selectedOption} onChange={setSelectedOption} placeholder="Type of deal...*" options={options} />
                                <input type="textarea" id="dealDescription" className="fadeIn third" placeholder="Description of the deal" required />
                                <input type="number" id="dealPrice" className="fadeIn third" placeholder="Price" required />
                                <ImageUpload dealId={dealId}/>
                            </div>
                            <input type="submit" id="submitDeal" className="fadeIn fourth" value="Share your deal!!" />
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}