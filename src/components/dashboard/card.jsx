import React from 'react';
import { useHistory } from 'react-router';
import './style.css';

const Card = ({ title, navigate }) => {

    const history = useHistory();

    const handleNavigation = () => {
        history.push(`${navigate}`)
    }

    return (
        <div className="card-container" onClick={handleNavigation}>
            <h3>{title}</h3>
            <p>Description</p>
        </div>
    )
}

export default Card;
