import React, { useState, useEffect } from "react";
import patientsData from "../data/patients.json";

const ProviderDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loggedInProviderUsername = "provider1"; 

  useEffect(() => {
    const assignedPatients = patientsData.filter(
      (patient) => patient.username === loggedInProviderUsername
    );
    setPatients(assignedPatients);
  }, [loggedInProviderUsername]);

  const handleOpenModal = React.useCallback((patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  }, []);


  const closeModal = () => {
    setSelectedPatient(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Assigned Patients</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Patient Name</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Compliance Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOpenModal(patient)}
              >
                <td className="p-3">{patient.profile.name}</td>
                <td className="p-3">{patient.profile.age}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                      patient.compliance === "Goal Met" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {patient.compliance}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
              onClick={closeModal}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              {selectedPatient.profile.name}'s Goals
            </h2>

            <div>
              {selectedPatient.recommendedGoals.map((goal, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{goal.name}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${
                      goal.status === "Goal Met" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {goal.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
