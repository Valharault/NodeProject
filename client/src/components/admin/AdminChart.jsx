import React, {useEffect, useState} from 'react'
import {PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend} from 'recharts';
import axios from "axios";
import {set} from "react-hook-form";

export default function AdminChart() {

    const [account, setAccount] = useState([])

    const data = [
        { name: 'Compte validés', value: account[1] }, { name: 'Compte en cours de validation', value: account[0] },

    ];

    const COLORS = ['#00C49F','#0088FE'];

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:4000/admin/dashboard')
            .then(res => {
                setAccount(res.data)
            })

    }, []);


        return (
            <div>
                <PieChart width={400} height={400}>
                    <Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} label>
                        {data.map((entry, index) => (
                            <Cell fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                        <Tooltip />
                        <Legend>Comptes en attente / Comptes validés</Legend>
                </PieChart>
            </div>
        );
}