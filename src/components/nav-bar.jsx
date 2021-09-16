import React from 'react'
import './style.css'

const Navbar = (props) => {
    const { title } = props;
    return (
        <div className="navbar-container">
            <h2>{title}</h2>
        </div>
    )
}

export default Navbar
