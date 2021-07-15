import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import axios from "axios";

export default function AdminValidAccount () {


    const SimpleList = ({ list }) => (
        <ul>
            {list.map(item => (
                <li key={item.id}>
                    <div>{item.id}</div>
                    <div>{item.email}</div>
                    <button type="button" value={item.email} onClick={handleClick}> Générer credentials</button>
                </li>
            ))}
        </ul>
    );

    const [list, setList] = useState([])

    const handleClick = async function (event) {
        const value = event.target.value
        event.preventDefault()
        axios.post(`http://localhost:4000/admin/security/credentials`, {'email': value})
            .then(res => {
                console.log(res);
                console.log(res.data);

            })
    }

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:4000/admin/security/merchand/valid')
            .then(res => {
                const mylist = res.data
                setList(mylist);
            })

    }, []);

    return <div>
        <SimpleList list={list} />
            <Button type="button" className="mt-5" onClick={handleClick}>Générer credentials</Button>
    </div>
}
