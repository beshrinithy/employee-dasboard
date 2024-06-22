// src/App.js
import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EmployeeCard from './components/EmployeeCard';
import EmployeeDetail from './components/EmployeeDetail';
import { mockEmployees } from './mockData';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://dummy.restapiexample.com/api/v1/employees');
      if (response.status === 429) throw new Error('Rate limit exceeded');
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error(error);
      setError('Rate limit exceeded, using mock data.');
      setEmployees(mockEmployees.data);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = () => {
    if (searchId) {
      const employee = employees.find(emp => emp.id === parseInt(searchId));
      if (employee) {
        setEmployees([employee]);
      } else {
        alert('Employee not found');
      }
    }
  };

  return (
    <Router>
      <div className="bg-gradient-to-r from-blue-200 to-blue-500 min-h-screen py-8">
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-800">Employee Dashboard</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="text-center mb-6">
            <input
              type="text"
              placeholder="Employee ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="border border-gray-300 p-2 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Search</button>
          </div>
          <div className="text-center mb-6 px-4 py-6 bg-gray-100 rounded-lg shadow-inner">
            <h2 className="text-3xl font-semibold mb-2 text-gray-800">Welcome to the Employee Dashboard</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              This dashboard allows you to view, search, and manage employee data easily. You can use the search box above to find an employee by their ID. Each employee's information is displayed on individual cards below. Click on a card to view more details about the employee.
            </p>
          </div>
          <Routes>
            <Route
              path="/"
              element={<EmployeeCard employees={employees} setEmployees={setEmployees} />}
            />
            <Route path="/employee/:id" element={<EmployeeDetail employees={employees} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;