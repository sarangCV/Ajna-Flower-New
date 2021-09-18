import React from 'react';
import BarLoader from "react-spinners/BarLoader";
import './style.css';


const Loader = ({loading}) => {
    return (
        <div className="loader-container">
            <BarLoader color={'#3A606E'} loading={loading} size={60} />
        </div>
    )
}

export default Loader;
