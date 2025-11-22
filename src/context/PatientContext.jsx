// src/context/PatientContext.jsx
import { createContext, useContext, useState } from "react";
import patients from "../data/patients.json";

const PatientContext = createContext();

export function PatientProvider({ children }) {
  const [patient, setPatient] = useState(patients[0]);

  return (
    <PatientContext.Provider value={{ patient, setPatient }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  return useContext(PatientContext);
}