import React, { useState, useEffect } from 'react';
import axios from '../../axios';

function Dashboard() {
    const [activeDatabase, setActiveDatabase] = useState('database1');
    const [records, setRecords] = useState([]);
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [newRecord, setNewRecord] = useState({
        name: '',
        email: '',
        phoneNumber: '',
    });
    const [notification, setNotification] = useState('');

    useEffect(() => {
        fetchRecords(activeDatabase);
    }, [activeDatabase]);

    const fetchRecords = async (database) => {
        try {
            const response = await axios.get(`/records?database=${database}`);
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({
            ...newRecord,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/records`, { ...newRecord, database: activeDatabase });
            setNewRecord({
                name: '',
                email: '',
                phoneNumber: '',
            });
            fetchRecords(activeDatabase);
            setNotification('Record added successfully.');
            setTimeout(() => {
                setNotification('');
            }, 3000); // Clear the notification after 3 seconds
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };


    const sortedRecords = [...records].sort((a, b) => {
        if (sortKey && sortOrder === 'asc') {
            return a[sortKey].localeCompare(b[sortKey]);
        } else if (sortKey && sortOrder === 'desc') {
            return b[sortKey].localeCompare(a[sortKey]);
        } else {
            return 0;
        }
    });

    const filteredRecords = sortedRecords.filter((record) => {
        return (
            record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.phoneNumber.includes(searchTerm)
        );
    });

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Dashboard</h2>
                {notification && <div className="bg-green-200 text-green-800 p-2 mb-2">{notification}</div>}
                <div className="flex items-center mb-4">
                    <select
                        value={activeDatabase}
                        onChange={(e) => setActiveDatabase(e.target.value)}
                        className="border px-4 py-2 rounded-lg mr-2"
                    >
                        <option value="database1">Database 1</option>
                        <option value="database2">Database 2</option>
                        <option value="database3">Database 3</option>
                    </select>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        className="border px-4 py-2 rounded-lg mr-2"
                    />
                    <button onClick={() => handleSort('name')} className="border px-4 py-2 rounded-lg mr-2">Sort by Name</button>
                    <button onClick={() => handleSort('email')} className="border px-4 py-2 rounded-lg mr-2">Sort by Email</button>
                    <button onClick={() => handleSort('phoneNumber')} className="border px-4 py-2 rounded-lg">Sort by Phone Number</button>
                </div>
                <table className="w-full border-collapse border border-gray-500">
                    <thead>
                        <tr>
                            <th className="border border-gray-500 px-4 py-2">Name</th>
                            <th className="border border-gray-500 px-4 py-2">Email</th>
                            <th className="border border-gray-500 px-4 py-2">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.map((record, index) => (
                            <tr key={index}>
                                <td className="border border-gray-500 px-4 py-2">{record.name}</td>
                                <td className="border border-gray-500 px-4 py-2">{record.email}</td>
                                <td className="border border-gray-500 px-4 py-2">{record.phoneNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmit} className="mb-4">
                <h2 className="text-xl font-bold mb-2">Add New Record</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={newRecord.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="border px-4 py-2 rounded-lg"
                    />
                    <input
                        type="email"
                        name="email"
                        value={newRecord.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="border px-4 py-2 rounded-lg"
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        value={newRecord.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="border px-4 py-2 rounded-lg"
                    />
                </div>
                <button type="submit" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg">
                    Add Record
                </button>
            </form>
        </div>
    );
}

export default Dashboard;
