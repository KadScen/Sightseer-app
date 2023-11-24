import React from 'react';
import {db} from "../Config/firebaseConfig";
import Cookies from 'js-cookie';
import firebase from 'firebase/compat/app';

export function EditProfilPic () {
    const dealFile = document.getElementById('dealFile');

    const readImages = async (e) =>{
        const filePath = dealFile.value;
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

        if ( !allowedExtensions.exec(filePath) ) {
            alert('Invalid file type');
            dealFile.value = '';
            return false;
        } else {
            const file = e.target.files[0];
            const storageRef = firebase.storage().ref('userProfilPic').child(Cookies.get('id'));
            await storageRef.put(file);
            storageRef.getDownloadURL().then((url) => {
                db.collection("Users").doc(Cookies.get('id')).set({
                    profilPicture: url
                }, { merge: true })
                .then(() => {
                    console.log("Document successfully written!");
                    window.location.href = "/myaccount";
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            });   
        }
    };


    return (
        <div className="imageUploadComponent">
            <p>Change profil picture</p>
            <input type='file' accept='image/*' id="dealFile" onChange={readImages}/>
        </div>
    )
}

export default EditProfilPic;