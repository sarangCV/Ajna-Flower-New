import React from 'react'
import './style.css'
import Card from '../../components/dashboard/card';
import Navbar from '../../components/nav-bar';

function Dashboard() {
    return (
        <>
            <div className="dashboard-container">
            <Navbar title='Dashboard'/>
                <div className="container dashboard-content-sec">
                    <div className="dashboard-content">
                        <Card
                            title="Add Dispatch"
                            navigate='/add-dispatch'
                            description= 'Add dispatch items'/>
                        <Card
                            title="Dispacthes"
                            navigate='/dispatches'
                            description= 'View and manage dispatches'/>
                        <Card
                            title="Add Customer"
                            navigate='/add-customer'
                            description= 'Add a new customer'/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
