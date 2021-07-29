import React, {useEffect, useState} from 'react';
import axios from "axios";
import { FaSearchPlus } from "react-icons/fa";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";


export default function AdminTransactions () {

    const [option, setOption] = useState([])
    const [value, setValue] = useState('all');
    const [merchand, setMerchand] = useState(0);
    const [search, setSearch] = useState('all');
    const [countTransaction, setCountTransaction] = useState(0);
    const [cancellTransaction, setCancelTransaction] = useState(0);
    const [successTransaction, setSuccessTransaction] = useState(0);
    const [refundTransaction, setRefundTransaction] = useState(0);
    const [avgItems, setAvgItems] = useState(0);

    const handleChange = async function (event) {

        const select = event.target;
        const id = select.children[select.selectedIndex].id;

        setMerchand(id)
        setValue(event.target.value)

    }

    const handleClick = async function (event) {
        event.preventDefault();
        let searchBar = document.getElementById('search-bar');

        setSearch(searchBar.value);

    }

    const Select = ({account}) => (
        <div className={"form-group col-4"}>
            <select value={value} className="form-control" onChange={handleChange} aria-label="Default select example">
                <option id={0} value={'all'}>Tous les marchands</option>
                {
                    account.map(item => (

                        <option id={item.id}> {item.email}</option>

                    ))
                }
            </select>
        </div>
    );

    const SearchBar = ({}) => (
        <div className={"form-group col-4"}>
            <div className="input-group rounded">
                <input id={"search-bar"} type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                       aria-describedby="search-addon"/>
                <span className="input-group-text border-0" id="search-addon" style={{cursor: "pointer"}} onClick={handleClick}>
                    <FaSearchPlus></FaSearchPlus>
            </span>
            </div>
        </div>
    )

    const SimpleList = ({ list }) => (
        <table className="table mt-5">
            <thead className="thead-light">
            <tr>
                <th scope="col">Client</th>
                <th scope="col">Date</th>
                <th scope="col">Produit</th>
                <th scope="col">Prix</th>
                <th scope="col">Marchand</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {list.map(item => (

                <tr key={item.id}>
                    <td>{item.customer_firstname} {item.customer_lastname}<br></br>{item.email}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.items.map(items => (<span>{items.name} / {items.unitPrice} / {items.quantity}<br></br></span>))}</td>
                    <td>{item.total_price}</td>
                    <td>{item.merchand_firstname} {item.merchand_lastname}<br></br>{item.merchand_email}</td>
                    <td><Button><Link to={`/admin/transactions/${item._id}`} style={{color: '#fff'}}>Voir la transaction</Link></Button></td>
                </tr>

            ))}
            </tbody>
        </table>
    );

    const [list, setList] = useState([])

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        };
        // GET request using axios inside useEffect React hook
        axios.get(`http://localhost:4000/api/admin/transactions/${merchand}/${search}`, config)
            .then(res => {
                const mylist = res.data[0]
                setList(mylist);
                setOption(res.data[1])
                setCountTransaction(res.data[2]);
                setCancelTransaction(res.data[3]);
                setAvgItems(res.data[4]);
                setSuccessTransaction(res.data[5]);
                setRefundTransaction(res.data[6]);
            })

    }, [merchand, search]);



    return <div className={"container"}>
        <h1 className="mt-5 mb-5">Liste des transactions</h1>
        <div className={"row mb-5"}>
            <div className={"col-4"}>
                <div className={"box-value box-light-red"}>
                        <span className={"box-title"}>
                    Nombre de transactions
                        </span>
                    <span className={"box-data"}>
                        {countTransaction}
                </span>
                </div>
            </div>
            <div className={"col-4"}>
                <div className={"box-value box-light-blue"}>
            <span className={"box-title"}>
                Transactions annulées
            </span>
                    <span className={"box-data"}>
                        {cancellTransaction}
            </span>
                </div>
            </div>
            <div className={"col-4"}>
                <div className={"box-value box-light-green"}>
            <span className={"box-title"}>
                Nombre d'articles moyen
            </span>
                    <span className={"box-data"}>
                        {avgItems.length > 0  ? avgItems[0].average.toFixed(2) : 0}
                    </span>
                </div>

            </div>
            <div className={"col-4"}>
                <div className={"box-value box-light-orange"}>
            <span className={"box-title"}>
                Nombre de paiement réussi
            </span>
                    <span className={"box-data"}>
                        {successTransaction}
                    </span>
                </div>

            </div>
            <div className={"col-4"}>
                <div className={"box-value box-light-violet"}>
            <span className={"box-title"}>
                Nombre de remboursement
            </span>
                    <span className={"box-data"}>
                        {refundTransaction}
                    </span>
                </div>

            </div>
        </div>
        <div className={"row"}>
        <Select account={option}/>
        <SearchBar></SearchBar>
        </div>
        <SimpleList list={list} />
    </div>
}
