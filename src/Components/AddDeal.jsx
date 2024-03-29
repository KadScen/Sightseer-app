import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import {useHistory} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import {v4 as uuid} from 'uuid';
import 'firebase/compat/auth';
import './AddDeal.css';
import ImageUpload from './ImageUpload';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDeal } from "../Actions";
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

//Init firebase DB
const db = firebase.firestore();
const auth = firebase.auth();

const options = [
    {value:'hiking', label:'Hiking'}, 
    {value:'sales', label:'Sales'}, 
    {value:'traveling', label:'Traveling'}, 
    {value:'other', label:'Other'}, 
];

let snackMessage = '';

export default function AddDeal() {
    //Call and run signinup from Redux Actions
    const dispatch = useDispatch();
    dispatch(addDeal());
    const [selectedOption, setSelectedOption] = useState(null);
    const history = useHistory();
    const location = {
        pathname: '/',
        state: { fromDashboard: true }
    }
    // infos contain the image irl
    const id = uuid();
    const [dealId, setDealId] = useState(id);
    // Take image infos from Redux's ImageUpload.jsx
    const imageInfos = useSelector((state) => state.imageInfos);
    // Make a ref of the image to read it's current state and be able to send it to the DB
    const imageRef = useRef(0);
    imageRef.current = imageInfos;
    const typeOfDeal = useRef(0);
    typeOfDeal.current = selectedOption;

    //Snackbar stuffs
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleClose = () => {
        setOpenSnackbar(false);
        history.push(location); 
    };

    useEffect(() => {
        const submitDeal = document.getElementById('submitDeal');
        const dealForm = document.getElementById('dealForm');
        const dealFile = document.getElementById('dealFile');

        submitDeal.addEventListener('click', (e) => loadEdit(e), false);
        function loadEdit(e) {
            const file = dealFile.files[0];
            if (file !== undefined && dealForm.checkValidity()) {
                e.preventDefault();
                snackMessage = 'Deal added with image thanks!!';
                setOpenSnackbar(true);
                auth.onAuthStateChanged(user => {
                    db.collection("Deals").doc(id).set({
                        dealUserCreator: user.uid,
                        dealName: document.getElementById('dealName').value,
                        dealLocation: document.getElementById('dealLocation').value,
                        dealType: typeOfDeal.current.value,
                        dealDescription: document.getElementById('dealDescription').value,
                        dealPrice: Number(document.getElementById('dealPrice').value),
                        imageUrl: imageRef.current,
                        dateDealPosted: firebase.firestore.Timestamp.now(),
                        interestLevel: 0,
                        dealId: id,
                        usersLiked: [0],
                        usersDisLiked: [0],
                        archived: false,
                        dealStatus: "pending"
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                });
            } else if (file === undefined && dealForm.checkValidity()) {
                e.preventDefault();
                snackMessage = 'Deal added without image thanks!!';
                setOpenSnackbar(true);
                auth.onAuthStateChanged(user => {
                    db.collection("Deals").doc(id).set({
                        dealUserCreator: user.uid,
                        dealName: document.getElementById('dealName').value,
                        dealLocation: document.getElementById('dealLocation').value,
                        dealType: typeOfDeal.current.value,
                        dealDescription: document.getElementById('dealDescription').value,
                        dealPrice: Number(document.getElementById('dealPrice').value),
                        imageUrl: 'false',
                        dateDealPosted: firebase.firestore.Timestamp.now(),
                        interestLevel: 0,
                        dealId: id,
                        usersLiked: [0],
                        usersDisLiked: [0],
                        archived: false,
                        dealStatus: "pending"
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                });
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
                                <input type="text" id="dealName" className="fadeIn second" name="dealName" placeholder="Title*" required />
                                <input type="text" id="dealLocation" className="fadeIn second" name="dealLocation" placeholder="Location*" required />
                                <Select defaultvalue={selectedOption} id="dealType" onChange={setSelectedOption} placeholder="Type...*" options={options} />
                                <input type="textarea" id="dealDescription" className="fadeIn third" placeholder="Description" required />
                                <input type="number" id="dealPrice" className="fadeIn third" placeholder="Price" min="0" max="99999" />
                                <ImageUpload dealId={dealId}/>
                            </div>
                            <input type="submit" id="submitDeal" className="fadeIn fourth" value="Share your deal!!" />
                        </form>
                        
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                                {snackMessage}
                            </Alert>
                        </Snackbar>
                    </div>
                </div>
            </div>
        </div>
    )
}