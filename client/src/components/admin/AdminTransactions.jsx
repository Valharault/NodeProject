import React, {useEffect, useState} from 'react';
import axios from "axios";

export default function AdminTransactions () {


    const SimpleList = ({ list }) => (
        <table className="table mt-5">
            <thead className="thead-light">
            <tr>
                <th scope="col">Prix</th>
                <th scope="col">Date</th>
                <th scope="col">Produit</th>
            </tr>
            </thead>
            <tbody>
            {list.map(item => (

                <tr key={item.id}>
                    <td>{item.Price}</td>
                    <td>{item.Date}</td>
                    <td>{item.Product}</td>
                </tr>

            ))}
            </tbody>
        </table>
    );


    const [list, setList] = useState([])

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:4000/admin/transactions')
            .then(res => {
                const mylist = res.data
                console.log(res.data);
                setList(mylist);
            })

    }, []);

    return <div className={"container"}>
        <h1 className="mt-5">Liste des transactions</h1>
        <SimpleList list={list} />
    </div>
}
