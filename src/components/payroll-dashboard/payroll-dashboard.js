import React from "react";
import './payroll-dashboard.css';
import {Link} from "react-router-dom";
import ProfilePic1 from '../../assets/profile-images/Ellipse -1.png';
import ProfilePic2 from '../../assets/profile-images/Ellipse -2.png';
import ProfilePic3 from '../../assets/profile-images/Ellipse -3.png';
import edit_btn from '../../assets/icons/create-black-18dp.svg';
import delete_btn from '../../assets/icons/delete-black-18dp.svg';

function PayrollDashboard() {

    function update(){
        console.log("update_data");
    }

    function remove(){
        console.log("remove_data");

    }


    return(
        <div className="main-content">
            <div className="header-content employee-header">
                <div className="emp-detail-text">
                    Employee Details
                    <div className="emp-count">3</div>
                </div>
                <Link to="/payroll-form" className="add-button">
                            <img className="add-button" src="../../assets/icons/add-24px.svg" alt=""/>Add Employee
                </Link>
            </div>

            <div className="table-main">
                <table id="table-display" className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Start Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img className="profile" src={ProfilePic1} alt="profile_img-1"/></td>
                            <td>Rachel</td>
                            <td>Female</td>
                            <td>
                                <div className="dept-label">HR</div>
                                <div className="dept-label">Finance</div>
                            </td>
                            <td>4000000</td>
                            <td>07 Feb 2022</td>
                            <td>
                                <img src={edit_btn} alt="delete" id="1" onClick={remove(this)}/>
                                <img src={delete_btn} alt="edit" id="1" onClick={update(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td><img className="profile" src={ProfilePic2} alt="profile_img-2"/></td>
                            <td>Ross</td>
                            <td>Male</td>
                            <td>
                                <div className="dept-label">Engineer</div>
                                <div className="dept-label">Finance</div>
                            </td>
                            <td>4000000</td>
                            <td>07 Feb 2022</td>
                            <td>
                                <img src={edit_btn} alt="delete" id="2" onClick={remove(this)}/>
                                <img src={delete_btn} alt="edit" id="2" onClick={update(this)}/>
                            </td>
                        </tr>
                        <tr>
                            <td><img className="profile" src={ProfilePic3} alt="profile_img-3"/></td>
                            <td>Joey</td>
                            <td>Male</td>
                            <td>
                                <div className="dept-label">HR</div>
                                <div className="dept-label">Others</div>
                            </td>
                            <td>4000000</td>
                            <td>07 Feb 2022</td>
                            <td>
                                <img src={edit_btn} alt="delete" id="3" onClick={remove(this)}/>
                                <img src={delete_btn} alt="edit" id="3" onClick={update(this)}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>  
    )
}

export default PayrollDashboard;