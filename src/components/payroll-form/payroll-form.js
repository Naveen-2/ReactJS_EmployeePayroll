import React, {useState, useEffect} from "react";
import './payroll-form.css';
import ProfilePic1 from '../../assets/profile-images/Ellipse -1.png';
import ProfilePic2 from '../../assets/profile-images/Ellipse -2.png';
import ProfilePic3 from '../../assets/profile-images/Ellipse -3.png';
import ProfilePic4 from '../../assets/profile-images/Ellipse -4.png';
import {Link} from "react-router-dom";
import EmployeeService from "../../service/employee-service";

const PayrollForm = (props) => {

    let initialValue = {
        name: '',
        profilePicArray: [
            {url: ProfilePic1},
            {url: ProfilePic2},
            {url: ProfilePic3},
            {url: ProfilePic4}
        ],
        allDepartments: ['HR', 'Sales', 'Finance', 'Engineer', 'Others'],
        department: [],
        gender: '',
        salary: '',
        day: '1',
        month: 'Jan',
        year: '2021',
        note: '',
        startDate: '01 Jan 2021',
        id: Date.now(),
        profilePic: '',
        isUpdate: false,
        error: {
            name: '',
            profilePic: '',
            gender: '',
            department: '',
            salary: '',
            startDate: ''
        }
    }

    const [formValue, setForm] = useState(initialValue);
 

    const setData = (obj) => {
        let dateArray = obj.startDate;
        console.log(obj);
        setForm({
            ...formValue,
            ...obj,
            name: obj.name,
            profilePic: obj.profilePic,
            gender: obj.gender,
            department: obj.department,
            salary: obj.salary,
            day:dateArray[8]+dateArray[9],
            month:dateArray[5]+dateArray[6],
            year:dateArray[0]+dateArray[1]+dateArray[2]+dateArray[3],
            note: obj.note,
            isUpdate: true,
            startDate: obj.startDate,
            
        });
        formValue.department.map(item => {
            getChecked(item);
        })
    }
       
    console.log(formValue)

    const changeValue = (event) => {
        setForm({...formValue, [event.target.name]: event.target.value})
    }
 
    const onCheckChange = (name) => {
        let index = formValue.department.indexOf(name);
        let checkArray = [...formValue.department];
        if (index > -1) {
            checkArray.splice(index, 1);
        }
        else {
            checkArray.push(name);
        }
        setForm({...formValue, department: checkArray})
    }
 
    const getChecked = (name) => {
        return formValue.department && formValue.department.includes(name);
    }
 
    useEffect(() => {
        if(props.history.location.state)
            setData(props.history.location.state.employeeData);
        
    }, []);

    const validateData = async () => {
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profilePic: '',
            note:''
        }
        if (!formValue.name.match('^[A-Z]{1}[a-zA-Z\\s]{2,}$')) {
            error.name = 'Invalid NAME'
            isError = true;
        }
        if (formValue.gender.length < 1) {
            error.gender = 'Select GENDER'
            isError = true;
        }
        if (formValue.salary.length < 1) {
            error.salary = 'Required SALARY'
            isError = true;
        }
        if (formValue.profilePic.length < 1) {
            error.profilePic = 'Select PROFILE PIC'
            isError = true;
        }
        if (formValue.department.length < 1) {
            error.department = 'Select DEPARTMENT'
            isError = true;
        }
        if (formValue.note.length < 1){
            error.note = "Required NOTES"
            isError = true;
        }
        setForm({ ...formValue, error: error })
        return isError;
    }

    const reset = () => {
        setForm({...initialValue, id: formValue.id, isUpdate: formValue.isUpdate});
    }

    const save = async (event) => {
        event.preventDefault();
        if (await validateData()) {
            return;
        }
        let Object = {
            name: formValue.name,
            gender: formValue.gender,
            department: formValue.department,
            salary: formValue.salary,
            startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
            note: formValue.note,
            profilePic: formValue.profilePic
        }
        if(props.history.location.state){
            Object.employeeId = props.history.location.state.employeeData.employeeId;
            const response = await EmployeeService.editEmployee(Object).then(() => {
                console.log("data edited successfully");
                props.history.push('');
            });
        } else {
            const response = await EmployeeService.addEmployee(Object).then(() => {
                console.log("data added successfully");
                props.history.push('');
            });
        }
        
    }

    const updateEmployee = async (id) => {
        const response = await EmployeeService.editEmployee(id);
        // console.log(response);
        
        // console.log(response);
        return response;
    }
    
    return (
        
        <div className="form-content">
            <form className="form" action="#" onSubmit={save}>

                <div className="form-head">Employee Payroll Form</div>
                <div className="row-content">
                    <label htmlFor="name" className="label text">Name</label>
                    <input type="text" name="name" id="name" className="input" value={formValue.name} placeholder="Your Name ..." onChange={changeValue} required />
                    <div className="error" > {formValue.error.name}</div>
                </div>

                <div className="row-content">
                   <label className="label text" htmlFor="profile">Profile image</label>
                   <div className="profile-radio-content">
                       <label>
                           <input type="radio" id="profile1" name="profilePic" checked={formValue.profilePic==='../../assets/profile-images/Ellipse -1.png'}
                                  value="../../assets/profile-images/Ellipse -1.png" onChange={changeValue}
                                  required />
                           <img className="profile" id="image1" src={ProfilePic1} alt=""/>
                       </label>
                       <label>
                           <input type="radio" id="profile2" name="profilePic" checked={formValue.profilePic==='../../assets/profile-images/Ellipse -2.png'}
                                  value="../../assets/profile-images/Ellipse -2.png" onChange={changeValue}
                                  required />
                           <img className="profile" id="image2" src={ProfilePic2} alt=""/>
                       </label>
                       <label>
                           <input type="radio" id="profile3" name="profilePic"checked={formValue.profilePic==='../../assets/profile-images/Ellipse -3.png'}
                                  value="../../assets/profile-images/Ellipse -3.png" onChange={changeValue}
                                  required />
                           <img className="profile" id="image3" src={ProfilePic3} alt=""/>
                       </label>
                       <label>
                           <input type="radio" id="profile4" name="profilePic" checked={formValue.profilePic==='../../assets/profile-images/Ellipse -4.png'}
                                  value="../../assets/profile-images/Ellipse -4.png" onChange={changeValue}
                                  required />
                           <img className="profile" id="image4" src={ProfilePic4} alt=""/>
                       </label>
                   </div>
                   <div className="error"> {formValue.error.profilePic}</div>
               </div>

                <div className="row-content">
                    <label className="label text" htmlFor="gender">Gender</label>
                    <div>
                        <input type="radio" id="male" name="gender" value="Male" checked={formValue.gender==="Male"} onChange={changeValue} required/>
                        <label className="text" htmlFor="male">Male</label>
                        <input type="radio" id="female" name="gender" value="Female" checked={formValue.gender==="Female"} onChange={changeValue} required/>
                        <label className="text" htmlFor="female">Female</label>
                    </div>
                    <div className="error"> {formValue.error.gender}</div>
                </div>

                <div className="row-content">
                   <label className="label text" htmlFor="department">Department</label>
                   <div>
                       {formValue.allDepartments.map(item => (
                           <span key={item}>
                                <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                 checked={getChecked(item)} value={item} />
                               <label className="text" htmlFor={item}>{item}</label>
                           </span>
                       ))}
                   </div>
                   <div className="error"> {formValue.error.department}</div>
               </div>

                <div className="row-content">
                    <label className="label text" htmlFor="salary">Choose Your Salary: </label>
                    <input className="input" type="range" name="salary" id="salary" min="300000" max="500000" step="100" 
                            value={formValue.salary==="" ? "300000" : formValue.salary} onChange={changeValue}/>
                    <output className="salary-output text" htmlFor="salary">{formValue.salary==="" ? 300000 : formValue.salary}</output>
                    <div className="error"> {formValue.error.salary}</div>
                </div>

                <div className="row-content">
                    <label className="label text" htmlFor="startDate">Start Date</label>
                    <div>
                        <select id="day" name="day" onChange={changeValue} value={formValue.day}>
                            <option value="01">1</option>
                            <option value="02">2</option>
                            <option value="03">3</option>
                            <option value="04">4</option>
                            <option value="05">5</option>
                            <option value="06">6</option>
                            <option value="07">7</option>
                            <option value="08">8</option>
                            <option value="09">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                        <select id="month" name="month" onChange={changeValue} value={formValue.month}>
                            <option value="Jan">January</option>
                            <option value="Feb">February</option>
                            <option value="Mar">March</option>
                            <option value="Apr">April</option>
                            <option value="May">May</option>
                            <option value="Jun">June</option>
                            <option value="Jul">July</option>
                            <option value="Aug">August</option>
                            <option value="Sep">September</option>
                            <option value="Oct">October</option>
                            <option value="Nov">November</option>
                            <option value="Dec">December</option>
                        </select>
                        <select id="year" name="year" onChange={changeValue} value={formValue.year}>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                        </select>
                    </div>
                    <div className="error">{formValue.error.startDate}</div>
                </div>

                <div className="row-content">
                    <label className="label text" htmlFor="note">Notes</label>
                    <textarea id="note" className="input" name="note" placeholder=""
                              value={formValue.note} onChange={changeValue}></textarea>
                    <div className="error">{formValue.error.note}</div>
                </div>

                <div className="buttonParent">
                   <Link to="/" className="resetButton button cancelButton">Cancel</Link>
                   <div className="submit-reset">
                       <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                       <button type="reset" className="resetButton button" onClick={reset}>Reset</button>
                   </div>
               </div>

            </form>
        </div>
    )
}

export default PayrollForm;
