import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import {v4 as uuid} from 'uuid';
import { useDispatch } from "react-redux";
import { imageInfos } from "../Actions";

export default function ImageUpload(props) {
    const dispatch = useDispatch();
    console.log('Id of the deal is: ' + props.dealId);

    const [imageUrl, setImageUrl] = useState([]);
    const readImages = async (e) =>{
        const file = e.target.files[0];
        const id = uuid();
        const storageRef = firebase.storage().ref('images').child(props.dealId).child(id);
        const imageRef = firebase.database().ref('images').child('daily').child(id);
        await storageRef.put(file);
        storageRef.getDownloadURL().then((url) => {
            imageRef.set(url);
            dispatch(imageInfos(url));
            const newState = [...imageUrl, { id, url }];
            setImageUrl(newState);
        });
    };

    const getImageUrl = () => {
        const imageUrls = imageUrl;
        const urls = [];
        for (let id in imageUrls) {
            urls.push({ id, url: imageUrl[id] });
        }
        const newState = [...imageUrl, ...urls];
        setImageUrl(newState);
    };

    const deleteImage = (id) => {
        const storageRef = firebase.storage().ref('images').child(props.dealId).child(id);
        const imageRef = firebase.database().ref('images').child('daily').child(id);
        storageRef.delete().then(() => {
            imageRef.remove();
        });
    };

    useEffect(() => {
        getImageUrl();
    }, []);

    return (
        <div>
            <p>Image Upload Complonent here</p>
            <input type='file' accept='image/*' onChange={readImages}/>
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