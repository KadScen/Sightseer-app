import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import {v4 as uuid} from 'uuid';
import { useDispatch } from "react-redux";
import { imageInfos } from "../Actions";

export default function ImageUpload(props) {
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState([]);
    const dealFile = document.getElementById('dealFile');

    const readImages = async (e) =>{
        const filePath = dealFile.value;
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

        if (!allowedExtensions.exec(filePath)) {
            alert('Invalid file type');
            dealFile.value = '';
            document.getElementById('imagePreview').innerHTML = 'No image added';
            return false;
        } else {
            const file = e.target.files[0];
            const id = uuid();
            const storageRef = firebase.storage().ref('dealsImages').child(props.dealId).child(id);
            const imageRef = firebase.database().ref('dealsImages').child(props.dealId).child(id);
            await storageRef.put(file);
            storageRef.getDownloadURL().then((url) => {
                imageRef.set(url);
                const newState = [...imageUrl, { id, url }];
                setImageUrl(newState);
            });
        }
    };

    const getImageUrl = () => {
        const imageRef = firebase.database().ref('dealsImages').child(props.dealId);
        imageRef.on('value', (snapshot) => {
          const imageUrls = snapshot.val();
          const urls = [];
          for (let id in imageUrls) {
            urls.push({ id, url: imageUrls[id] });
          }
          const newState = [...imageUrl, ...urls];
          setImageUrl(newState);
          dispatch(imageInfos(newState));
        });
    };

    const deleteImage = (id) => {
        const storageRef = firebase.storage().ref('dealsImages').child(props.dealId).child(id);
        const imageRef = firebase.database().ref('dealsImages').child(props.dealId).child(id);
        storageRef.delete().then(() => {
            imageRef.remove();
        });
        setImageUrl(imageUrl.filter(({ id }) => id === id));
        console.log(imageUrl.id);
    };

    useEffect(() => {
        getImageUrl();
    }, []);

    return (
        <div>
            <p>Image Upload Complonent here</p>
            <input type='file' accept='image/*' id="dealFile" onChange={readImages}/>
            {imageUrl 
                ? imageUrl.map(({id,url}) => {
                    return (
                        <div key={id}>
                            <img src={url} alt=""/>
                            <button onClick={() => deleteImage(id)}>Delete</button>
                        </div>
                    );
                }) 
            : ''}
        </div>
    );
};  