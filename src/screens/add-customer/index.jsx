import React, { useState, useEffect } from 'react';
import { addClients } from '../../api/clients';
import Navbar from '../../components/nav-bar';
import { authTokenKey } from '../../configuration';
import './style.css';

const AddCustomer = () => {

    const [customerDetails, setCustomerDetails] = useState(
        {
            clientName: '',
            clientNumber: '',
            clientCity: '',
            customerRemark: ''

        }
    );
    const [authToken, setAuthToken] = useState(null)

    // Initialising useeffect funtion
    useEffect(() => {
        getInitialData();
    }, [])

    // Fetching Initial data for the screen
    const getInitialData = async () => {
        const token = await sessionStorage.getItem(authTokenKey);
        await setAuthToken(token);
    }

    const validateCustomerData = (data) => {
        let isNull = Object.values(data).every(o => o === '');
        return isNull;
    }

    const submit = () => {
        console.log(customerDetails);
        const isNull = validateCustomerData(customerDetails)
        console.log(isNull);
        if(!isNull) {
            addClients(authToken, customerDetails)
            .then((resData) => {
                const {success, message} = resData;
                alert(message);
                setCustomerDetails({
                    clientName: '',
                    clientNumber: '',
                    clientCity: '',
                    customerRemark: ''
                });
            })
        }
        else {
            alert('Please enter any details')
        }
    }

    return(
        <div className="add-customer-container">
            <Navbar title="Add a customer"/>
            <div className="container">
                <div className="add-customer-content">
                    <div className="customer-details-section">
                        <div className="row">
                            <div className="col-lg-3 col-sm-6">
                                <div className="add-customer-detail">
                                    <p className="add-customer-label">Customer name</p>
                                    <input 
                                        type="text" 
                                        placeholder="Enter name" 
                                        className="form-control" 
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={(itemVal) => setCustomerDetails({
                                            ...customerDetails,
                                            clientName: itemVal.target.value
                                        })}
                                        value={customerDetails.clientName}
                                        />
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="add-customer-detail">
                                    <p className="add-customer-label">Customer number</p>
                                    <input 
                                        type="text" 
                                        placeholder="Enter number" 
                                        className="form-control" 
                                        aria-label="Small" 
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={(itemVal) => setCustomerDetails({
                                            ...customerDetails,
                                            clientNumber: itemVal.target.value
                                        })}
                                        value={customerDetails.clientNumber}
                                        />
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="add-customer-detail">
                                    <p className="add-customer-label">Customer city</p>
                                    <input 
                                        type="text" 
                                        placeholder="Enter city" 
                                        className="form-control" 
                                        aria-label="Small" 
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={(itemVal) => setCustomerDetails({
                                            ...customerDetails,
                                            clientCity: itemVal.target.value
                                        })}
                                        value={customerDetails.clientCity}
                                        />
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="add-customer-detail">
                                    <p className="add-customer-label">Customer remark</p>
                                    <input 
                                        type="text" 
                                        placeholder="Enter remarks" 
                                        className="form-control" 
                                        aria-label="Small" 
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={(itemVal) => setCustomerDetails({
                                            ...customerDetails,
                                            customerRemark: itemVal.target.value
                                        })}
                                        value={customerDetails.customerRemark}
                                        />
                                </div>
                            </div>
                        </div>
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
                                        onClick={submit}
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

export default AddCustomer;