// src/components/EmployeeDetail.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';



const EmployeeDetail = ({ employees }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = employees.find(emp => emp.id === parseInt(id));

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-800">Employee Details</h1>
      <div className="text-center mb-6 px-4 py-6 bg-gray-100 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">{employee.employee_name}</h2>
        <p className="text-lg text-gray-700 mb-4">Age: {employee.employee_age}</p>
        <p className="text-lg text-gray-700 mb-4">Salary: ${employee.employee_salary}</p>
        <button onClick={() => navigate(-1)} className="bg-gray-500 text-white p-2 rounded mb-4">Back</button>
        
      </div>
    </div>
  );
};

export default EmployeeDetail;
