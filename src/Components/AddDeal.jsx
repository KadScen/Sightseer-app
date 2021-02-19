import React from 'react'

export default function AddDeal() {

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
                                <input type="text" id="signup-name" className="fadeIn second" name="name" placeholder="name*" required />
                                <input type="email" id="signup-email" className="fadeIn second" name="email" placeholder="email*" required />
                                <input type="password" id="signup-password" className="fadeIn third" name="password" placeholder="password*" required />
                                <input type="textarea" id="signup-houseName" className="fadeIn third" placeholder="Name it here*" required />
                            </div>
                            <input type="submit" id="submitSignup" className="fadeIn fourth" value="Sign Up" />
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}