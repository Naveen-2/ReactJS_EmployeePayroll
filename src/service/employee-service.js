import config from '../config/config';
import axios from 'axios';

class EmployeeService {
    baseURL = config.baseURL;
    addEmployee = (data) => {
        if(data.isUpdate){
            return axios.post(`${this.baseURL}employee/${data.id}`);
        } else {
        return axios.post(`${this.baseURL}employee`, data);
        }
    }

    getEmployee = () => {
        return axios.get(`${this.baseURL}employee`);
    }

    deleteEmployee = (id) => {
        return axios.delete(`${this.baseURL}employee/${id}`);
    } 

    editEmployee = (id) => {
        return axios.get(`${this.baseURL}employee/${id}`);
    }
}

export default new EmployeeService();