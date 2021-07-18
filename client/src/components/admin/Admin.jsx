import React, {useEffect, useState} from 'react';
import {Alert, Button, Tab, Tabs} from "react-bootstrap";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {set} from "react-hook-form";
import AdminChart from "./AdminChart";

export default function Admin() {



    return <div className={"container"}>
        <h1 className="mt-5">Dashboard</h1>

        <AdminChart />

        </div>
}