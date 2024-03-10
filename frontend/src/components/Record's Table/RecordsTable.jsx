// RecordsTable.js
import React, { useState, useEffect } from 'react';
import axios from '../../axios';

function RecordsTable({ database }) {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get(`/records?database=${database}`);
                setRecords(response.data);
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        };

        fetchRecords();
    }, [database]);

    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">{database}</h3>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.id}>
                            <td className="border border-gray-300 px-4 py-2">{record.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{record.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{record.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecordsTable;
