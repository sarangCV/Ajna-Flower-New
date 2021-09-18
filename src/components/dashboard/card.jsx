import React from 'react';
import { useHistory } from 'react-router';
import './style.css';

const Card = ({ title, navigate, description }) => {

    const history = useHistory();

    const handleNavigation = () => {
        history.push(`${navigate}`)
    }

    return (
        <div className="card-container" onClick={handleNavigation}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default Card;
