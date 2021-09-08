import React, { useState, useEffect } from 'react';
import { addClients } from '../../api/clients';
import { authTokenKey } from '../../configuration';
import './style.css';

const AddCustomer = () => {

    const [customerDetails, setCustomerDetails] = useState(
        {
            clientName: null,
            clientNumber: null,
            clientCity: null,
            customerRemark: null

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
        let isNull = Object.values(data).every(o => o === null);
        return isNull;
    }

    const submit = () => {
        // console.log(customerDetails);
        const isNull = validateCustomerData(customerDetails)
        if(!isNull) {
            addClients(authToken, customerDetails)
            .then((resData) => {
                const {success, message} = resData;
                alert(message);
            })
        }
        else {
            alert('Please enter any details')
        }
    }

    return(
        <div className="add-customer-container">
            <div className="container">
                <div className="add-customer-content">
                    <h2 className="add-customer-title">Add a customer</h2>
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