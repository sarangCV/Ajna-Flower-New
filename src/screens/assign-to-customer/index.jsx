import React from 'react';
import { useState } from 'react';
import './style.css';
import Select from 'react-select'


const AssignToCustomer = () => {

    const [dispatches, setDispatches] = useState([
        {
            id: "B001",
            index:0,
            items: [
                {
                    id: 0,
                    value_one: "VLG",
                    value_two: 100
                },
                {
                    id: 1,
                    value_one: "PLG",
                    value_two: 200
                },
                {
                    id: 2,
                    value_one: "WLG",
                    value_two: 300
                },
            ]
        },
        {
            id: "B002",
            index:0,
            items: [
                {
                    id: 0,
                    value_one: "VLG",
                    value_two: 100
                }
            ]
        },
        {
            id: "B003",
            index:0,
            items: [
                {
                    id: 0,
                    value_one: "PLG",
                    value_two: 400
                },
                {
                    id: 1,
                    value_one: "VLG",
                    value_two: 500
                }
            ]
        }
    ])

    const customers = [
        { value: 'Customer-1', label: 'Customer-1' },
        { value: 'Customer-2', label: 'Customer-2' },
        { value: 'Customer-3', label: 'Customer-3' },
    ]

    return(
        <div className="assign-to-customer-container">
            <div className="container">
                <div className="assign-to-customer-content">
                    <h2 className="assign-to-customer-title">Assign boxes to customer</h2>
                    <div className="dispatch-box-section">
                            {dispatches.map((item) => {
                                return(
                                    <div className="single-box-section" key={item.id}>
                                        <div className="row">
                                            <div className="col-2">
                                                <p className="assign-customer-label">ID</p>
                                            </div>
                                            <div className="col-3">
                                                <p className="assign-customer-label">Item Name</p>
                                            </div>
                                            <div className="col-2">
                                                <p className="assign-customer-label">Item Qty</p>
                                            </div>
                                            <div className="col-5">
                                                <p className="assign-customer-label">Select a customer</p>
                                            </div>
                                        </div>
                                        <div className="row inner-dispatch-box">
                                                <div className="col-2">
                                                    <div className="dispatch-id-section assign-customer-id">
                                                        <p>{item.id}</p>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="dispatch-item-name-section assign-customer-item-name">
                                                        {item.items.map((val) => {
                                                            // console.log("Item Names:---", val.value_one)
                                                            return(
                                                                <p>{val.value_one}</p>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                <div className="col-2">
                                                    <div className="dispatch-item-quantity-section assign-customer-item-name">
                                                        {item.items.map((val) => {
                                                                // console.log("Item Names:---", val.value_one)
                                                                return(
                                                                    <p>{val.value_two}</p>
                                                                )
                                                            })}
                                                    </div>
                                                </div>
                                                <div className="col-5">
                                                    <div className="assign-customer-list ">
                                                    <Select 
                                                            options={customers}
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
            </div>
        </div>
    )
}

export default AssignToCustomer;