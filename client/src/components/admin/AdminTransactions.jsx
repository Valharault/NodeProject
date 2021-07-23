import React, {useEffect, useState} from 'react';
import axios from "axios";


export default function AdminTransactions () {

    const [option, setOption] = useState([])
    const [value, setValue] = useState('all');
    const [merchand, setMerchand] = useState(0);

    const handleChange = async function (event) {

        const select = event.target;
        const id = select.children[select.selectedIndex].id;

        setMerchand(id)
        setValue(event.target.value)

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

    const SimpleList = ({ list }) => (
        <table className="table mt-5">
            <thead className="thead-light">
            <tr>
                <th scope="col">Client</th>
                <th scope="col">Date</th>
                <th scope="col">Produit</th>
                <th scope="col">Prix</th>
                <th scope="col">Statut</th>
                <th scope="col">Marchand</th>
            </tr>
            </thead>
            <tbody>
            {list.map(item => (

                <tr key={item.id}>
                    <td>{item.firstname} {item.lastname}<br></br>{item.email}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.shop.product} {item.shop.type} <br></br> {item.shop.couleur}</td>
                    <td>{item.price}</td>
                    <td>{item.state}</td>
                    <td>{item.merchand.firstname} {item.merchand.lastname}<br></br>{item.merchand.email}</td>
                </tr>

            ))}
            </tbody>
        </table>
    );

    const [list, setList] = useState([])

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get(`http://localhost:4000/admin/transactions/${merchand}`)
            .then(res => {
                const mylist = res.data[0]
                console.log(res.data);
                setList(mylist);
                setOption(res.data[1])
            })

    }, [merchand]);


    return <div className={"container"}>
        <h1 className="mt-5">Liste des transactions</h1>
        <Select account={option}/>
        <SimpleList list={list} />
    </div>
}
