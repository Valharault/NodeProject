import React from 'react'
import {
    PieChart,
    Pie,
    Sector,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    CartesianGrid,
    XAxis,
    YAxis,
    Line,
    LineChart
} from 'recharts';

export default function AdminChart(props) {


    //1 : PIE CHART

    const dataPieChart = [
        { name: 'Compte validés', value: props.value[1] }, { name: 'Compte en cours de validation', value: props.value[0] },

    ];

    const COLORS = ['#00C49F','#0088FE'];

    //2 : LINE CHART

    const dataLineChart = props.value[2]



        return (
            <div className={"container row"}>
                <div className={"col-6"}>
                <PieChart width={400} height={400}>
                    <Pie dataKey="value" isAnimationActive={false} data={dataPieChart} cx={200} cy={200} outerRadius={80} label>
                        {dataPieChart.map((entry, index) => (
                            <Cell fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                        <Tooltip />
                        <Legend>Comptes en attente / Comptes validés</Legend>
                </PieChart>
            </div>
                <div className={"col-6 mt-5"}>
                    <LineChart
                        width={500}
                        height={350}
                        data={dataLineChart}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="createDate" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="registerCount"
                            stroke="#8884d8"
                            name="Nombre d'inscriptions par date"
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </div>
            </div>
        );
}
