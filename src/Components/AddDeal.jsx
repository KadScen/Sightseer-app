import React, { useEffect } from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { firebaseApp } from '../Config/firebaseConfig';
import './AddDeal.css';

const useStyles = makeStyles((theme) => ({
    input: {
      display: 'none',
    },
}));

export default function AddDeal() {
    const options = [
        {value:'hiking', label:'Hiking'}, 
        {value:'sales', label:'Sales'}, 
        {value:'traveling', label:'Traveling'}, 
        {value:'other', label:'Other'}, 
    ]

    const classes = useStyles();

    // const onChange = (e) => {
    //     const file = e.target.files[0];
    //     const storageRef = firebaseApp.storage().ref();
    //     const fileRef = storageRef.child(file.name);
    //     fileRef.put(file).then(() => {
    //         console.log("File uploaded");
    //     });
    // }

    useEffect(() => {
        const submitDeal = document.getElementById('submitDeal');
        const dealForm = document.getElementById('dealForm');
        const dealFile = document.getElementById('dealFile');

        submitDeal.addEventListener('click', function(e) {
            const file = dealFile.files[0];
            const storageRef = firebaseApp.storage().ref();
            const fileRef = storageRef.child(file.name);
            fileRef.put(file).then(() => {
                console.log("File uploaded");
            });
        })

        dealFile.addEventListener('change', function(e) {
            const fileInput = document.getElementById('dealFile');
            const filePath = fileInput.value;
            
            const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    
            if (!allowedExtensions.exec(filePath)) {
                alert('Invalid file type');
                fileInput.value = '';
                return false;
            } else {
                if (fileInput.files && fileInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById('imagePreview').innerHTML = '<img src="' + e.target.result + '"/>';
                    };
    
                    reader.readAsDataURL(fileInput.files[0]);
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
                                <Select placeholder="Type of deal...*" options={options} />
                                <input type="textarea" id="dealDescription" className="fadeIn third" placeholder="Description of the deal" required />
                                <input type="number" id="dealPrice" className="fadeIn third" placeholder="Price" required />
                                <input type="file" accept="image/*" multiple id="dealFile" className={classes.input} />
                                <label htmlFor="dealFile">
                                    <Button variant="contained" color="primary" component="span">
                                        Upload image(s)
                                    </Button>
                                </label>
                                <div id="imagePreview"></div>

                            </div>
                            <input type="submit" id="submitDeal" className="fadeIn fourth" value="Share your deal!!" />
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}