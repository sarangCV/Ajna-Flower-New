import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './style.css';
import Select from 'react-select'
import { getItemsList } from '../../api/items';
import { authTokenKey } from '../../configuration';
import { getDispatchDetails, getDispatchedItem, getDispatchItem } from '../../api/dispatch';
import { getClientsList } from '../../api/clients';
import Navbar from '../../components/nav-bar';
import { assignItems } from '../../api/assign-items';
import Loader from '../../components/loader';

import Modal from '../../components/modal';


const AssignToCustomer = () => {

    const params = useParams();
    const history = useHistory();

    const [loading, setLoading] = useState(true)
    const [authToken, setAuthToken] = useState(null);
    const [dispatchId, setDispatchId] = useState(null);

    const [dispatches, setDispatches] = useState(null);
    const [clientsList, setClientsList] = useState(null);
    const [dispatchedItems, setDispatchedItems] = useState(null)

    const [selectedItems, setSelectedItems] = useState([])
    const [selectedClient, setSelectedClient] = useState(null)

    const [isModal, setIsModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null)


    useEffect( async () => {
      setDispatchId(params.id);
      const token = sessionStorage.getItem(authTokenKey);
      setAuthToken(token);
      getInitialData(params.id, token);
      
    }, [])

    const getInitialData = async (id, token) => {

        setLoading(true);
        // Runs to obtain dispatch items
        await getDispatchItem (id, token)
        .then((res) => {
            const { clientsList, success, message } = res;
            if(success) {
                setDispatches(clientsList);
                setLoading(false);
            }
            else {
                console.log(res.message);
            }
            
        })

        // Runs to obtain clients
        await getClientsList(token)
        .then((res) => {
            const { clientsList, success } = res;
            if(success) {
                setLoading(false);
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

        // Runs to obtain dispatched items
        await getDispatchedItem(id, token)
        .then((res) => {
            const { success, message, clientsList } = res;
            if(success) {
                setDispatchedItems(clientsList);
                console.log("DISPACTHED",dispatchId, token);
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

    const confirmItems = () => {
        console.log('DISPATCHED ITEMS::', dispatchedItems);
        console.log("DISPATCHES::", dispatches);

        if(dispatches == null || dispatches.length == 0) {
            setAlertMessage('There is nothing to assign want to go back?')
            setIsModal(true);
        }
        else {
            if(selectedClient !== null && selectedItems.length != 0) {
                const selectedClientName = clientsList.find(x => x.id === selectedClient).value;
                setAlertMessage(`${selectedItems.length}Boxes to ${selectedClientName}`);
                setIsModal(true);
            }
            else {
                alert('Select atleast one box and client')
            }
        }

        
    }
    const onSubmit = async () => {
        console.log("CLIENT LIST::", clientsList);
        console.log("DISPATCHES::", dispatches);
        console.log('SELECTED ITEMS', selectedItems);
        console.log('SELECTED CLIENT', selectedClient);
        console.log("SUBMIT DATA::", dispatchId, selectedClient, selectedItems );

        if(dispatches == null || dispatches.length == 0) {
            history.goBack();
            setIsModal(false);
        }
        else {
            await assignItems(dispatchId, selectedClient, selectedItems, authToken)
            .then((res) => {
                const { success, message } = res;
                if(success) {
                    alert(message);
                    setIsModal(false);
                    getInitialData(dispatchId, authToken);
                    setSelectedItems([]);
                }
                else {
                    alert(message);
                }
            })
        }
        
    }
    
    return(
        <div className="assign-to-customer-container">
            <Navbar title='Assign boxes to customer'/>
            {loading ? <Loader/> : 
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
                    <div 
                        className="assign-to-customer-content" 
                        style={{ display: dispatches&&dispatches.length !== 0 ? 'block' : 'none' }}>
                        <div className="dispatch-box-section">
                            <h3>Choose boxes to assign</h3>
                            {dispatches && dispatches.map((item, index) => {
                                return(
                                    <div className="single-box-section assign-items-single" 
                                        key={item.index}
                                        onClick={() => toggleItem(item.id)} 
                                        style={{ backgroundColor: selectedItems.includes(item.id) ? '#607B7D' : '#fff' }}
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
                    <div 
                        className="assign-to-customer-content "
                        style={{ display: dispatchedItems&&dispatchedItems.length !== 0 ? 'block' : 'none' }}
                        >
                        <div className="dispatch-box-section">
                            <h3>Assigned boxes</h3>
                            {dispatchedItems && dispatchedItems.map((item, index) => {
                                return(
                                    <div className="single-box-section assigned-items-single" 
                                        key={item.index}
                                        >
                                        <div className="row">
                                            <div className="col-3">
                                                <p className="assign-customer-label">ID</p>
                                            </div>
                                            <div className="col-9">
                                                <p className="assign-customer-label">Boxes</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="dispatch-id-section assign-customer-id">
                                                    <p>{item.box_no}</p>
                                                </div>
                                            </div>
                                            <div className="col-9">
                                                <div className="dispatch-item-name-section assign-customer-item-name">
                                                    {item.items.map((val) => {
                                                        return(
                                                            <p>{val}</p>
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
                                <div className="col-6 d-flex flex-column align-items-end">
                                        <button type="button" className="btn btn-primary " onClick={() => history.goBack()}><i class="fas fa-angle-double-right" style={{ marginRight: 10 }}></i>Done</button>
                                    </div>
                                    <div className="col-6">
                                        <button type="button" className="btn btn-secondary" onClick={confirmItems}><i className="fas fa-check" style={{ marginRight: 10 }}></i>Submit</button>
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            }
            
            {isModal && <Modal setOpenModal={setIsModal} modalConfirm={onSubmit} description={alertMessage}/>}
        </div>
    )
}

export default AssignToCustomer;