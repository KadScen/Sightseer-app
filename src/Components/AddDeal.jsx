import React, { useEffect,useState } from 'react';
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
    const infos = useSelector((state) => state.imageInfos);
    const id = uuid();
    const [dealId, setDealId] = useState(id);


    useEffect(() => {
        const submitDeal = document.getElementById('submitDeal');
        const dealForm = document.getElementById('dealForm');
        const dealFile = document.getElementById('dealFile');

        submitDeal.addEventListener('click', (e) => loadEdit(e), false);
        async function loadEdit(e) {
            const file = dealFile.files[0];
            const storageRef = firebaseApp.storage().ref();
            if (file !== undefined && dealForm.checkValidity()) {
                e.preventDefault();
                const fileRef = storageRef.child(file.name);
                await fileRef.put(file);
                fileRef.getDownloadURL().then((url) => {
                    console.log("File uploaded");
                    alert('Deal added with image thanks!!');
                    db.collection("Deals").doc(id).set({
                        imageUrl: infos,
                        location: "to be defined"
                    })
                    .then(function() {
                        console.log("Document successfully written!");
                        history.push(location);
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                });
            } else if (file === undefined && dealForm.checkValidity()) {
                e.preventDefault();
                //Send form in DB here
                alert('Deal added without image thanks!!');
                history.push(location);
            }
        }

        // submitDeal.addEventListener('click', function(e) {

        // })

        dealFile.addEventListener('change', function(e) {
            const filePath = dealFile.value;
            const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    
            if (!allowedExtensions.exec(filePath)) {
                alert('Invalid file type');
                dealFile.value = '';
                document.getElementById('imagePreview').innerHTML = 'No image added';
                return false;
            } else {
                if (dealFile.files && dealFile.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById('imagePreview').innerHTML = 'Image ready to be uploaded';
                    };
                    reader.readAsDataURL(dealFile.files[0]);
                }
            }
        })
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
                                <input type="file" accept="image/*" multiple id="dealFile" className={classes.input} />
                                <label htmlFor="dealFile">
                                    <Button variant="contained" color="primary" component="span">
                                        Upload image(s)
                                    </Button>
                                </label>
                                <div id="imagePreview"><span>No image added</span></div>

                            </div>
                            <input type="submit" id="submitDeal" className="fadeIn fourth" value="Share your deal!!" />
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}