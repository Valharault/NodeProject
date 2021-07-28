import axios from "axios";
import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:4000/api";

class AuthService {

    adminLogin(email, password) {
        return axios
            .post(API_URL + "/admin/login", {
                email,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                }

                return response.data;
            });
    }

    merchandLogin(email, password) {
        return axios
            .post(API_URL + "/login", {
                email,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("token");
    }

    merchandRegister(values) {
        return axios.post(API_URL + "/register", {values}).then(response => {
            return response.data;
        });
    }

    getCurrentUser() {
        if (!localStorage.getItem('token')) {
            return null;
        }
        let token = JSON.parse(localStorage.getItem('token'));
        console.log(jwt_decode(token))
        return jwt_decode(token);
    }
}

export default new AuthService();
