import axios from "axios";

const API_URL = "http://localhost:4000";

class AuthService {

    adminLogin(email, password) {
        return axios
            .post(API_URL + "/admin/security/login", {
                email,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }


    merchandLogin(email, password) {
        return axios
            .post(API_URL + "/security/login", {
                email,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    merchandRegister(values) {
        console.log(values)
        return axios.post(API_URL + "/security/register", {values}).then(response => {
            return response.data;
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
