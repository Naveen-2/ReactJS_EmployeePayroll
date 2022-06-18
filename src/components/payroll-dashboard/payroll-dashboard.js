import React, {useState} from "react";
import './payroll-dashboard.css';
import {Link} from "react-router-dom";
import EmployeeCard from "../EmployeeCard/employee-card";
import EmployeeService from "../../service/employee-service";

const PayrollDashboard = (props) => {
    

    const [employeesCount, setEmployeesCount] = useState([]);


    const retrieveEmployees = async () => {
        const response = await EmployeeService.getEmployee();
        return response;
    };
    const getEmployeesCount = async () => {
        const allEmployees = await retrieveEmployees();
        // console.log(allEmployees.data.data.length)
        if(allEmployees) {
            setEmployeesCount(allEmployees.data.data.length);
        }
        
    };

    getEmployeesCount();
   
    return(
        <div className="main-content">
            <div className="header-content employee-header">
                <div className="emp-detail-text">
                    Employee Details
                    <div className="emp-count">{employeesCount}</div>
                </div>
                <Link to="/payroll-form" className="add-button">
                    Add Employee
                </Link>
            </div>

            <div className="table-main">
                <table id="table-display" className="table">
                    <thead>
                        <tr>
                            <th>Emp ID</th>
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
                        <EmployeeCard />
                    </tbody>
                </table>
            </div>
        </div>  
    )
}

export default PayrollDashboard;