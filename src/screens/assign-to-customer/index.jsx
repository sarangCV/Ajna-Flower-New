import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './style.css';
import Select from 'react-select'
import { getItemsList } from '../../api/items';
import { authTokenKey } from '../../configuration';
import { getDispatchDetails, getDispatchItem } from '../../api/dispatch';
import { getClientsList } from '../../api/clients';
import Navbar from '../../components/nav-bar';


const AssignToCustomer = () => {

    const params = useParams();

    const [authToken, setAuthToken] = useState(null);
    const [dispatches, setDispatches] = useState(null);
    const [clientsList, setClientsList] = useState(null);

    const [selectedItems, setSelectedItems] = useState([])
    const [selectedClient, setSelectedClient] = useState(null)


    useEffect( async () => {
      await getInitialData();
    }, [])

    const getInitialData = async () => {
        const token = sessionStorage.getItem(authTokenKey);
        setAuthToken(token);
        await getDispatchItem (params.id, token)
        .then((res) => {
            const { clientsList, success, message } = res;
            if(success) {
                setDispatches(clientsList);
                // console.log(res);
            }
            else {
                console.log(res.message);
            }
            
        })
        await getClients(token)
        // console.log('TOKEN IS::', token);
    }

    // Runs initally to obtain clients
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

    // Runs when choosing a client
    const clientHandler = (item) => {
        setSelectedClient(item.id)
    }

    // Runs when an item selected
    const toggleItem = (id) => {
        let selectedItemsCopy = [...selectedItems]
        if(!selectedItemsCopy.includes(id)) {
            setSelectedItems([
                ...selectedItemsCopy,
                id
            ]);
        }
        else {
            const index = selectedItemsCopy.indexOf(id);
            selectedItemsCopy.splice(index, 1);
            setSelectedItems(selectedItemsCopy);
        }
    }

    const onSubmit = () => {
        console.log("CLIENT LIST::", clientsList);
        console.log("DISPATCHES::", dispatches);
        console.log('SELECTED ITEMS', selectedItems);
        console.log('SELECTED CLIENT', selectedClient);
    }
    
    return(
        <div className="assign-to-customer-container">
            <Navbar title='Assign boxes to customer'/>
            <div className="container">
                <div className="dispatches-option-sec">
                    <div className="dispatches-option-text">
                        <p>Choose a client</p>
                    </div>
                    <div className="dispatches-option-menu">
                        <Select 
                            options={clientsList}
                            className="dispatches-input-select" 
                            onChange={ (item, index) => clientHandler(item) }
                            // value={{ value: currentOption, label: currentOption }}                                                   
                        />
                    </div>
                    
                </div>
                <div className="assign-to-customer-content">
                    <div className="dispatch-box-section">
                        <h3>Choose boxes to assign</h3>
                        {dispatches && dispatches.map((item, index) => {
                            return(
                                <div className="single-box-section" 
                                    key={item.index}
                                    onClick={() => toggleItem(item.id)} 
                                    style={{ backgroundColor: selectedItems.includes(item.id) ? 'rgb(56, 56, 56)' : '#fff' }}
                                    >
                                    <div className="row">
                                        <div className="col-3">
                                            <p className="assign-customer-label" 
                                                style={{ color: selectedItems.includes(item.id) ? '#fff' : '#000' }}>ID</p>
                                        </div>
                                        <div className="col-9">
                                            <p className="assign-customer-label"
                                                style={{ color: selectedItems.includes(item.id) ? '#fff' : '#000' }}>Boxes</p>
                                        </div>
                                    </div>
                                    <div className="row inner-dispatch-box">
                                        <div className="col-3">
                                            <div className="dispatch-id-section assign-customer-id">
                                                <p style={{ color: selectedItems.includes(item.id) ? '#fff' : '#000' }}>{item.box_no}</p>
                                            </div>
                                        </div>
                                        <div className="col-9">
                                            <div className="dispatch-item-name-section assign-customer-item-name">
                                                {item.items.map((val) => {
                                                    return(
                                                        <p style={{ color: selectedItems.includes(item.id) ? '#fff' : '#000' }}>{val}</p>
                                                    )
                                                })}
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