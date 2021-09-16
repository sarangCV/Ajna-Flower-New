import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './style.css';
import Select from 'react-select'
import { getItemsList } from '../../api/items';
import { authTokenKey } from '../../configuration';
import { getDispatchDetails } from '../../api/dispatch';
import { getClientsList } from '../../api/clients';
import Navbar from '../../components/nav-bar';


const AssignToCustomer = () => {

    const params = useParams();

    const [authToken, setAuthToken] = useState(null);
    const [dispatches, setDispatches] = useState(null);
    const [clientsList, setClientsList] = useState(null);


    useEffect( async () => {
      await getInitialData();
    }, [])

    const getInitialData = async () => {
        const token = sessionStorage.getItem(authTokenKey);
        setAuthToken(token);
        await getDispatchDetails (token, params.id)
        .then((res) => {
            const { data, success } = res;
            if(success) {
                setDispatches(data.dispatches);
                // console.log(data.dispatches);
            }
            else {
                console.log(res.message);
            }
            
        })
        await getClients(token)
        // console.log('TOKEN IS::', token);
    }

    const getClients = async (token) => {
        // console.log('TOKEN IS::', token);
        await getClientsList(token)
        .then((res) => {
            const { clientsList, success } = res;
            if(success) {
                let clients = []
                clientsList.map((val) => {
                    clients = [...clients,
                       {
                           value: val.name,
                           label: val.name,
                           id: val.id
                       }
                   ]
                })
                setClientsList(clients);
                console.log(clients);
                // console.log(clientsList);
            }
        })
    }

    const onSubmit = () => {
        console.log("CLIENT LIST::", clientsList);
        console.log("DISPATCHES::", dispatches);
    }
    
    return(
        <div className="assign-to-customer-container">
            <Navbar title='Assign boxes to customer'/>
            <div className="container">
                <div className="assign-to-customer-content">
                    <div className="dispatch-box-section">
                            {dispatches && dispatches.map((item) => {
                                return(
                                    <div className="single-box-section" key={item.id}>
                                        <div className="row">
                                            <div className="col-2">
                                                <p className="assign-customer-label">ID</p>
                                            </div>
                                            <div className="col-4">
                                                <p className="assign-customer-label">Box</p>
                                            </div>
                                           
                                            <div className="col-6">
                                                <p className="assign-customer-label">Select a customer</p>
                                            </div>
                                        </div>
                                        <div className="row inner-dispatch-box">
                                            <div className="col-2">
                                                <div className="dispatch-id-section assign-customer-id">
                                                    <p>{item.box_no}</p>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="dispatch-item-name-section assign-customer-item-name">
                                                    {item.items.map((val) => {
                                                        // console.log("Item Names:---", val.value_one)
                                                        return(
                                                            <p>{val}</p>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            
                                            <div className="col-6">
                                                <div className="assign-customer-list ">
                                                <Select 
                                                        options={clientsList}
                                                        className="dispatch-input-select"                                                            
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                           
                        </div>
                </div>
                <div className="dispatch-footer">
                    <div className="button-container">
                        <div className="container">
                            <div className="row d-flex justify-content-center">
                                <div className="col-12 d-flex flex-column align-items-center">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary " 
                                        onClick={onSubmit}
                                        >
                                        <i className="fas fa-check" style={{ marginRight: 10 }}></i>
                                        Submit
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignToCustomer;