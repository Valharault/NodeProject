import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api';

class UserService {
    getTransactions() {
        return axios.get(API_URL + '/transactions');
    }
}

export default new UserService();
