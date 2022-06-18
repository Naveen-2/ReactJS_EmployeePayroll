import config from '../config/config';
import axios from 'axios';

class EmployeeService {
    baseURL = config.baseURL;
    addEmployee = (data) => {
        // if(data.isUpdate){
        //     return axios.put(`${this.baseURL}employee/${data.id}`, data);
        // } else {
            
        return axios.post(`${this.baseURL}employee/create`, data);
        // }
    }

    getEmployee = () => {
        return axios.get(`${this.baseURL}employee`);
    }

    deleteEmployee = (id) => {
        return axios.delete(`${this.baseURL}employee/delete/${id}`);
    } 

    editEmployee = (data) => {
        console.log(data);
        return axios.put(`${this.baseURL}employee/update/${data.employeeId}`, data);
    }
}

export default new EmployeeService();