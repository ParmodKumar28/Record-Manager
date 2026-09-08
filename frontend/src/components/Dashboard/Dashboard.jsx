import React, { useState, useEffect } from 'react';
import axios from '../../axios';

function Dashboard() {
    // State variables
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
    const [errorNotification, setErrorNotification] = useState('');

    // Fetch records based on active database
    useEffect(() => {
        fetchRecords(activeDatabase);
    }, [activeDatabase]);

    // Fetch records function
    const fetchRecords = async (database) => {
        try {
            const response = await axios.get(`/records?database=${database}`);
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    // Sort records function
    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    // Handle input change in new record form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({
            ...newRecord,
            [name]: value,
        });
    };

    // Handle form submission to add a new record
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
            setErrorNotification(error.response.data.error);
            setTimeout(() => {
                setErrorNotification('');
            }, 3000); // Clear the error notification after 3 seconds
        }
    };


    // Sort and filter records
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

    // JSX for the dashboard component
    return (
        <div className="container p-4 mx-auto">
            <div className="mb-4">
                <h2 className="mb-2 text-xl font-bold">Dashboard</h2>
                {notification && <div className="p-2 mb-2 text-green-800 bg-green-200">{notification}</div>}
                {errorNotification && <div className="p-2 mb-2 text-red-800 bg-red-200">{errorNotification}</div>}
                <div className="flex flex-col items-center mb-4 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                    <select
                        value={activeDatabase}
                        onChange={(e) => setActiveDatabase(e.target.value)}
                        className="px-4 py-2 mr-2 border rounded-lg"
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
                        className="px-4 py-2 mr-2 border rounded-lg"
                    />
                    <button onClick={() => handleSort('name')} className="px-4 py-2 mr-2 border rounded-lg">Sort by Name</button>
                    <button onClick={() => handleSort('email')} className="px-4 py-2 mr-2 border rounded-lg">Sort by Email</button>
                    <button onClick={() => handleSort('phoneNumber')} className="px-4 py-2 border rounded-lg">Sort by Phone Number</button>
                </div>
                <table className="w-full border border-collapse border-gray-500 sm:table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border border-gray-500">Name</th>
                            <th className="px-4 py-2 border border-gray-500">Email</th>
                            <th className="px-4 py-2 border border-gray-500">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.map((record, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border border-gray-500">{record.name}</td>
                                <td className="px-4 py-2 border border-gray-500">{record.email}</td>
                                <td className="px-4 py-2 border border-gray-500">{record.phoneNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmit} className="mb-4">
                <h2 className="mb-2 text-xl font-bold">Add New Record</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={newRecord.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="px-4 py-2 border rounded-lg"
                    />
                    <input
                        type="email"
                        name="email"
                        value={newRecord.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="px-4 py-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        value={newRecord.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="px-4 py-2 border rounded-lg"
                    />
                </div>
                <button type="submit" className="px-4 py-2 mt-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Add Record
                </button>
            </form>
        </div>
    );
}

export default Dashboard;
