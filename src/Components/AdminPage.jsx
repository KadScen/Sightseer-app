import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import MainBody from './MainBody';
import {db} from "../Config/firebaseConfig";
import firebase from 'firebase/app';

export function AdminPage() {
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
        Cookies.set('id', user.uid);
    });
    const [currentUserData, setCurrentUserData] = useState(0);
    
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
                }
                setCurrentUserData(data);

            } catch(err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="adminPageComponent">
            <p>This is the admin page. Here is the list of the deals that are pending and waiting for your approval. Please reviews them carefully :)</p>
            <div className="listAdminDeals">
                {Cookies.get('id') && currentUserData.userRole ? <MainBody getUserDealId={Cookies.get('id')} userRole={currentUserData.userRole}/> : <p>Looking for pending deals...</p>}
            </div>
        </div>
    )
}

export default AdminPage;