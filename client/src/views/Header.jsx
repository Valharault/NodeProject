import React, {Component, useState} from 'react';
import AuthService from "../services/auth.service"
import AdminNavbar from "../components/AdminNavbar";
import MerchandNavbar from "../components/MerchandNavbar";
import DefaultNavbar from "../components/DefaultNavbar";

export default class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        const {currentUser} = this.state;
        if (currentUser == null) {
            return (
                <DefaultNavbar/>
            );
        } else if (currentUser.user.roles.includes('admin')) {
            return (
                <AdminNavbar/>
            );
        } else if (currentUser.user.roles.includes('merchand')) {
            return (
                <MerchandNavbar/>
            );
        }
    }
}
