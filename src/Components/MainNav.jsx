import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';

import './MainNav.css';
import DropMenu from './DropMenu';

function MainNav() {
    return (
        <div className="mainNavComponent">
            <nav>
                <div className="nav-wrapper">
                    <h1 className="brand-logo center"><a href="/">Sightseer</a></h1>
                    <DropMenu/>
                </div>
            </nav>
        </div>
    );
}
 
export default MainNav;