import React from "react";
import './Header.css';
import Logo from '../../assets/images/logo.png';
import {Link} from "react-router-dom";

class Header extends React.Component {
    
    render(){

    const pathname=window.location.pathname;
    let pathto="";
    if(pathname === "/payroll-form"){
        pathto="/";
    } else {
        pathto="/payroll-form";
    }

        return (
            
            <header className="header-content header">
                <div className="logo-content" >
                    <Link to={pathto}>
                        <img src={Logo} className="logo-content-img" alt="logo" />
                    </Link>
                        
                        <div>
                            <span className="emp-text">EMPLOYEE</span><br/>
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                        
                </div>
            </header>
        )
    }
}
export default Header;