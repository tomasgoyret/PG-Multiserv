import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="w-full bg-blue-900 text-white py-2 px-12 font-semibold">
            <Link to="/" className="inline-flex bg-blue-50 hover:bg-blue-100 text-blue-900 px-4 py-2 rounded-md transition-all ease-out duration-200">
                <span>UI Components templates</span>
            </Link>
        </div>
    )
}

export default NavBar
