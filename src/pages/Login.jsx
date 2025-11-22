import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const users = [
    {
        email: 'atulassan007@gmail.com',
        password: 'atha123',
        role: 'user'
    },
    {
        email: 'atulassan777@gmail.com',
        password: 'atha123',
        role: 'admin'
    },
    {
        email: 'atulassan123@gmail.com',
        password: 'atha123',
        role: 'admin'
    }
]

export default function Login() {

    const { login } = useContext(AuthContext);

    const [data, setFormData] = useState({});
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("Email and password cant be empty");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        if(!data.email && !data.password) {
            setError(true);
            return;
        } else {
            setError(false);            
        }
        const findUsers = login(data);
        console.log("++++++++   ", findUsers);
        if(findUsers) {
            navigate("/dashboard", { replace: true });  
        }
        
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 text-center">

                {/* Logo */}
                <div className="w-36 h-36 bg-gray-200 mx-auto rounded-lg mb-6 flex items-center justify-center">
                    <span className="text-gray-500">150 × 150</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-blue-500 mb-6">Login</h1>

                {/* Email Input */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                        name="email"
                        value={data.email}
                    />

                    {/* Password Input */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                        name="password"
                        value={data.password}
                    />
                    <p>{error && message}</p>
                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-lime-500 text-white py-3 rounded-lg font-medium hover:bg-lime-600 
                transition">
                        Login
                    </button>
                </form>

                {/* Forgot Password */}
                <p className="mt-4">
                    <a href="#" className="text-blue-500 hover:underline">
                        Forgot Password?
                    </a>
                </p>

                {/* Register */}
                <p className="mt-2">
                    <a href="#" className="text-blue-500 hover:underline">
                        New User? Register here
                    </a>
                </p>
            </div>
        </div>
    );
}
