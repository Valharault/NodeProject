import React, {useEffect, useState} from 'react';
import {Alert, Button} from "react-bootstrap";
import axios from "axios";
import {useHistory} from "react-router-dom";

export default function AdminValidAccount () {

    const history = useHistory();

    const SimpleList = ({ list }) => (
        <table className="table mt-5">
            <thead className="thead-light">
            <tr>
                <th scope="col">Prénom</th>
                <th scope="col">Nom</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {list.map(item => (

                <tr key={item.id}>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>
                    { item.client_id == null && item.client_secret == null ? <button className={"btn btn-success"} type="button" value={item.email} onClick={handleClick}> Générer credentials</button> : <button className={"btn btn-primary"} type="button" value={item.id} onClick={showAccount}> Voir le compte</button> }
                </td>
                </tr>

            ))}
            </tbody>
        </table>
    );

    const [visibleAlert, setVisibleAlert] = useState(false);

    const handleVisible = () => {
        setVisibleAlert(true)
        setTimeout(() => {
            setVisibleAlert(false)
        }, 4000);
    }

    const [list, setList] = useState([])
    const [value, setValue] = useState('');
    const [message, setMessage] = useState('');

    const handleClick = async function (event) {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        };
        const value = event.target.value
        event.preventDefault()
        axios.post(`http://localhost:4000/api/admin/credentials`, {'email': value}, config)
            .then(res => {
                if (res.data[1] !== 500) {
                    setList(res.data[1])
                    setValue('success');
                    setMessage(res.data[0])
                } else {
                    setValue('danger');
                    setMessage(res.data[0])
                }

                handleVisible()

            })
    }

    const showAccount = async function (event) {
        const value = event.target.value
        history.push(`/admin/merchand/${value}`)
    }

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        };
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:4000/api/admin/merchand/valid', config)
            .then(res => {
                const mylist = res.data
                console.log(res.data);
                setList(mylist);
            })

    }, []);

    return <div className={"container"}>
        <h1 className="mt-5">Liste des comptes</h1>
        <SimpleList list={list} />


        <Alert className="col-md-6 offset-md-3" variant={value} show={visibleAlert}>
            {message}
        </Alert>
    </div>
}
