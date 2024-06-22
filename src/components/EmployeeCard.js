import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeCard = ({ employees, setEmployees }) => {
  const navigate = useNavigate();
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleDelete = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
  };

  const handleEdit = (id) => {
    console.log(`Edit employee with ID: ${id}`);
  };

  const handleCardClick = (id) => {
    navigate(`/employee/${id}`);
  };

  const handleSelect = (id) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => !selectedEmployees.includes(employee.id))
    );
    setSelectedEmployees([]);
  };

  return (
    <div>
      {selectedEmployees.length > 0 && (
        <div className="text-center mb-4">
          <button onClick={handleDeleteSelected} className="bg-red-500 text-white p-2 rounded">
            Delete Selected
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-auto">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className={`employee-card bg-white p-4 rounded shadow cursor-pointer relative transition-transform transform hover:scale-105 ${
              selectedEmployees.includes(employee.id) ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleCardClick(employee.id)}
          >
            {/* Optional: Display an image if employee has an image URL */}
            {employee.image_url && (
              <img
                src={employee.image_url}
                alt={employee.employee_name}
                className="rounded-full h-12 w-12 object-cover absolute top-2 right-2"
              />
            )}
            <input
              type="checkbox"
              checked={selectedEmployees.includes(employee.id)}
              onChange={() => handleSelect(employee.id)}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-2 left-2"
            />
            <h5 className="text-lg font-bold text-gray-800">{employee.employee_name}</h5>
            <p className="text-gray-600">Age: {employee.employee_age}</p>
            <p className="text-gray-600">Salary: ${employee.employee_salary}</p>
            <div className="flex justify-end mt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(employee.id);
                }}
                className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(employee.id);
                }}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeCard;
