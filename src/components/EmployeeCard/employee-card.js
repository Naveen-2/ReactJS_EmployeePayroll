
import React, {useState, useEffect} from "react";
import EmployeeService from "../../service/employee-service";
import edit_btn from '../../assets/icons/create-black-18dp.svg';
import delete_btn from '../../assets/icons/delete-black-18dp.svg';
import {Link} from "react-router-dom";

import ProfilePic1 from '../../assets/profile-images/Ellipse -1.png';
import ProfilePic2 from '../../assets/profile-images/Ellipse -2.png';
import ProfilePic3 from '../../assets/profile-images/Ellipse -3.png';
import ProfilePic4 from '../../assets/profile-images/Ellipse -4.png';

const EmployeeCard = () => { 
   
    const [employeesData, setEmployeesData] = useState([]);
  
    const retrieveEmployees = async () => {
        const response = await EmployeeService.getEmployee();
        return response;
    };

    useEffect(() => {
        const getAllEmployeeData = async () => {
            const allEmployees = await retrieveEmployees();
            if(allEmployees.data) setEmployeesData(allEmployees.data);
        };

        getAllEmployeeData();
    }, []);

    useEffect(() => {

    }, [employeesData]);


    const removeEmployee = (id) => {
        console.log(id);
        const response = EmployeeService.deleteEmployee(id);
        console.log(response);
        window.location.reload();
        return response;
    }

    
    console.log(employeesData)
    return (
        <>  
            {
                employeesData.data && employeesData.data.map((element, index) =>(
                    
                    <tr key={index}>
                        <td className="empID">{element.employeeId}</td>
                        <td><img className="profile" src={(element.profilePic === '../../assets/profile-images/Ellipse -1.png') ? ProfilePic1:
                                                           (element.profilePic === '../../assets/profile-images/Ellipse -2.png') ? ProfilePic2:
                                                           (element.profilePic === '../../assets/profile-images/Ellipse -3.png') ? ProfilePic3:
                                                           (element.profilePic === '../../assets/profile-images/Ellipse -4.png') ? ProfilePic4:
                                                           ""} alt=""/></td>
                        <td className="empName">{element.name}</td>
                        <td className="empGender">{element.gender}</td>
                        <td>
                            {element.department && element.department.map((dept => 
                                (<div className="dept-label">{dept}</div>)))}
                        </td>
                        <td className="empSalary">{element.salary}</td>
                        <td className="empStartData">{element.startDate}</td>
                        <td>
                            <img src={delete_btn} alt="delete" id={element.employeeId} onClick={() => {removeEmployee(element.employeeId)}}/>
                            <Link to={{ pathname: "/payroll-form", state: {employeeData: element} }}>
                                <img src={edit_btn} alt="edit" id={element.employeeId}/>
                            </Link>
                        </td>
                    </tr> 
                ))
            }
        </>
    );
}

export default EmployeeCard;