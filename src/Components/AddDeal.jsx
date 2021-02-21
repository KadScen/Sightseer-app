import React from 'react';
import Select from 'react-select';

import './AddDeal.css';

export default function AddDeal() {
    const options = [
        {value:'hiking', label:'Hiking'}, 
        {value:'sales', label:'Sales'}, 
        {value:'traveling', label:'Traveling'}, 
        {value:'other', label:'Other'}, 
    ]
    return (
        <div className="addDealComponent">
            <div className="loginDiv">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        {/* <!-- Tabs Titles --> */}
                        <h2 className="underlineHover">Add a deal</h2>

                        {/* <!-- Signup Form --> */}
                        <form>
                            <div className="inputField">
                                <input type="text" id="dealName" className="fadeIn second" name="dealName" placeholder="Deal name*" required />
                                <input type="text" id="dealLocation" className="fadeIn second" name="dealLocation" placeholder="Deal location*" required />
                                <Select placeholder="Type of deal...*" options={options} />
                                <input type="textarea" id="dealDescription" className="fadeIn third" placeholder="Description of the deal" required />
                                <input type="number" id="dealPrice" className="fadeIn third" placeholder="Price" required />
                                <button>Upload photo(s)</button>
                            </div>
                            <input type="submit" id="submitSignup" className="fadeIn fourth" value="Share your deal!!" />
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}