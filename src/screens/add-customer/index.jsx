import React from 'react';
import './style.css';

const AddCustomer = () => {
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
                                        placeholder="Enter qty" 
                                        className="form-control" 
                                        aria-label="Small" 
                                        aria-describedby="inputGroup-sizing-sm"/>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="add-customer-detail">
                                    <p className="add-customer-label">Customer number</p>
                                    <input 
                                        type="text" 
                                        placeholder="Enter qty" 
                                        className="form-control" 
                                        aria-label="Small" 
                                        aria-describedby="inputGroup-sizing-sm"/>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="add-customer-detail">
                                    <p className="add-customer-label">Customer city</p>
                                    <input 
                                        type="text" 
                                        placeholder="Enter qty" 
                                        className="form-control" 
                                        aria-label="Small" 
                                        aria-describedby="inputGroup-sizing-sm"/>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="add-customer-detail">
                                    <p className="add-customer-label">Customer remark</p>
                                    <input 
                                        type="text" 
                                        placeholder="Enter qty" 
                                        className="form-control" 
                                        aria-label="Small" 
                                        aria-describedby="inputGroup-sizing-sm"/>
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
                                    <button type="button" className="btn btn-secondary " ><i className="fas fa-check" style={{ marginRight: 10 }}></i>Submit</button>
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