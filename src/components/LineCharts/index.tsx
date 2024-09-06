import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from 'recharts';

// 数据集
const data1W = [
    { name: 'Mon', value1: 16281.48, value2: 6638.72 },
    { name: 'Tue', value1: 16000, value2: 6500 },
    { name: 'Wed', value1: 15800, value2: 6400 },
    { name: 'Thu', value1: 16500, value2: 6600 },
    { name: 'Fri', value1: 16800, value2: 6700 },
    { name: 'Sat', value1: 17000, value2: 6800 },
    { name: 'Sun', value1: 17200, value2: 6900 },
];

const data1M = [
    { name: 'Week 1', value1: 16281.48, value2: 6638.72 },
    { name: 'Week 2', value1: 16800, value2: 7000 },
    { name: 'Week 3', value1: 17000, value2: 7200 },
    { name: 'Week 4', value1: 18000, value2: 7500 },
];

const data3M = [
    { name: 'Apr', value1: 15000, value2: 6000 },
    { name: 'May', value1: 16000, value2: 6500 },
    { name: 'Jun', value1: 16500, value2: 6700 },
    { name: 'Jul', value1: 16281.48, value2: 6638.72 },
    { name: 'Aug', value1: 17000, value2: 6900 },
    { name: 'Sep', value1: 18000, value2: 7500 },
];

const CustomTooltip = ({ active, payload }: {
    active: boolean | undefined;
    payload: any[] | undefined;
}) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black text-white p-2 rounded-md" style={{ opacity: 0.75 }}>
                <p className="font-bold">{`$${payload[0].value.toFixed(2)}`}</p>
            </div>
        );
    }
    return null;
};

const LineCharts = () => {
    const [selectedData, setSelectedData] = useState(data1W); // 默认显示1周的数据

    const handleDataChange = (period: string) => {
        if (period === '1W') setSelectedData(data1W);
        else if (period === '1M') setSelectedData(data1M);
        else if (period === '3M') setSelectedData(data3M);
    };

    return (
        <div>
            <div className="flex justify-end space-x-2 mb-4">
                <div className='bg-[#f1f1f1] rounded-[4px] p-[4px]'>
                    <button
                        className={`px-3 py-1 rounded-md ${selectedData === data1W ? 'bg-thirdary text-primary' : 'text-primary'}`}
                        onClick={() => handleDataChange('1W')}
                    >
                        1W
                    </button>
                    <button
                        className={`px-3 py-1 rounded-md ${selectedData === data1M ? 'bg-thirdary text-primary' : 'text-primary'}`}
                        onClick={() => handleDataChange('1M')}
                    >
                        1M
                    </button>
                    <button
                        className={`px-3 py-1 rounded-md ${selectedData === data3M ? 'bg-thirdary text-primary' : 'text-primary'}`}
                        onClick={() => handleDataChange('3M')}
                    >
                        3M
                    </button>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={selectedData} margin={{ top: 50, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={({ active, payload }) => (<CustomTooltip active={active} payload={payload} />)} />
                    <Legend />
                    <Line type="monotone" dataKey="value1" stroke="#2ca02c" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="value2" stroke="#ff7300" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineCharts;