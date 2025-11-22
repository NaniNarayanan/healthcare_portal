import { Link } from 'react-router-dom';

export default function Menus() {
    return (
        <nav class="flex justify-center mt-4 space-x-8 text-white text-lg">
            <Link to="/">Home</Link>
            <Link to="/healthtopics">Health Topics</Link>
            <Link to="/services">Services</Link>
            <Link to="/login">Login</Link>
            {/* <a href="#" class="hover:text-gray-200">Home</a>
            <a href="#" class="hover:text-gray-200">Health Topics</a>
            <a href="#" class="hover:text-gray-200">Services</a>
            <a href="#" class="hover:text-gray-200">Contact</a> */}
        </nav>
    )
}