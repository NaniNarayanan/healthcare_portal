import React, { useEffect, useState } from "react";
import RegexInput from "../reusecomponent/regexInput";
import Toast from "../reusecomponent/toastMessage";
import ConfirmModal from "../reusecomponent/confirmPopModal";
import PatientData from "../data/patients.json"
import { useParams } from "react-router-dom";
import BreadCrumbs from "../reusecomponent/BreadCrump";

export default function ProfileInformation() {
  const [editMode, setEditMode] = useState(false);
  const [ toast, setToast ] = useState({show:false, message:"", type:""});
  const [ showModal, setShowModal ] = useState(false);
  const { id } = useParams();
  const selectedUserId = Number(id);

 useEffect(() => {
  const selected = PatientData.find((u) => u.id === selectedUserId);

  if (selected) {
    setFormData({
      ...selected.profile,
      provider: selected.profile.provider, // already string OK
    });
  }
 }, [selectedUserId]);


  const [formData, setFormData] = useState({});

  const requiredFields = ["name", "age", "email", "mobile", "address"]; 

  const [errors, setErrors] = useState({});

  const regexValidators = {
    name: /^[A-Za-z ]{2,30}$/,
    age: /^[0-9]{1,3}$/,
    dob: /^\d{4}-\d{2}-\d{2}$/,
    gender: /^(Male|Female|Other)$/i,
    height: /^[0-9]{1,3}(\.[0-9]{1,2})?$/,
    weight: /^[0-9]{1,3}(\.[0-9]{1,2})?$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    mobile: /^[0-9]{10}$/,
    address: /^.{5,100}$/,
    provider: /^(Dr\.?|Mr\.?|Mrs\.?|Ms\.?)?\s?[A-Za-z ]{2,30}$/i,

  };

    const handleValidation = (name, value) => {
    // If field is NOT required  allow empty, skip validation
    if (!requiredFields.includes(name) && value.trim() === "") {
        return "";
    }

    // Required field check
    if (requiredFields.includes(name) && value.trim() === "") {
        return `${name} is required`;
    }

    // Regex check
    if (regexValidators[name] && !regexValidators[name].test(value)) {
        return `Invalid ${name}`;
    }

    return "";
    };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    const err = handleValidation(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: err
    }));
  };

    const handleSave = () => {
    const validationErrors = {};

    Object.keys(formData).forEach((key) => {
        const error = handleValidation(key, formData[key]);
        if (error) validationErrors[key] = error;
    });

    if (Object.keys(validationErrors).length === 0) {
        setEditMode(false);
        setToast({
        show: true,
        message: "Profile updated successfully",
        type: "success",
        });

        setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
        }, 3000);

    } else {
        const errorText = Object.values(validationErrors).join(", "); // <-- FIX

        setErrors(validationErrors);

        setToast({
        show: true,
        message: errorText,    // <-- now STRING, not object
        type: "error",
        });

        setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
        }, 3000);
    }
    };


  const handleDelete = () => {
    setShowModal(true);
  }

  const confirmDelete = () => {
    setShowModal(false);
      setToast({
        show:true,
        message:"Profile deleted!",
        type:"success"
      })

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  }

  return (
    <>
    <BreadCrumbs
    crumbs={["Profile", "Profile Information"]}
    paths={[`/profile/${id}`, `/profile-information/${id}`]}
    selected={(crumb) => console.log("hello", crumb)}
    />
    
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-5">

    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">


    <h1 className="text-xl font-bold text-gray-800">
        Profile Information
    </h1>



    <div className="flex flex-wrap gap-3">

        {!editMode && (
        <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
        >
            Edit
        </button>
        )}

        {editMode && (
        <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full sm:w-auto"
        >
            Save
        </button>
        )}

        <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 w-full sm:w-auto"
        >
        Delete
        </button>

        <ConfirmModal
        show={showModal}
        title="Delete Profile"
        message="Are you sure you want to delete this profile?"
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
        />

    </div>
    </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
          <RegexInput
            key={key}
            label={key.toUpperCase()}
            name={key}
            type={key === "dob" ? "date" : "text"}
            value={formData[key]}
            regex={regexValidators[key]}
            required={requiredFields.includes(key)}
            error={errors[key]}
            onChange={handleChange}
            disabled={key === "provider" ? true : !editMode}
          />
        ))}
      </div>

      {toast.show && <Toast message={toast.message} type={toast.type}/>}
    </div>
    </>
    
  );
  
}