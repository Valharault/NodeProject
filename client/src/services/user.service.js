import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000';

class UserService {
    getTransactions() {
        return axios.get(API_URL + '/api/transactions');
    }
}

export default new UserService();
