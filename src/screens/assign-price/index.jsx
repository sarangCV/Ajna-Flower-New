import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './style.css';
import Select from 'react-select'
import { getItemsList } from '../../api/items';
import { authTokenKey } from '../../configuration';
import { getDispatchDetails } from '../../api/dispatch';
import { getClientsList } from '../../api/clients';
import Navbar from '../../components/nav-bar';
import moment from 'moment';
import { assignedItems } from '../../api/assign-items';
import { assignPrice } from '../../api/assign-price';
import { assignCalculatedPrice } from '../../api/calculated-price';
import Loader from '../../components/loader';



const AssignPrice = (props) => {

    const params = useParams();
    const history = useHistory();

    const [loading, setLoading] = useState(true)
    const [authToken, setAuthToken] = useState(null);
    const [dispatchesId, setDispatchesId] = useState(null);
    const [assignedDate, setAssignedDate] = useState(null)
    const [clientsList, setClientsList] = useState(null);
    const [findItemData, setFindItemData] = useState([])
    const [selectedClient, setSelectedClient] = useState(null)

    const [isSubmitVisible, setisSubmitVisible] = useState(false)

    const [assignedItemsData, setAssignedItemsData] = useState([])

    const [totalPrice, setTotalPrice] = useState(null)


    useEffect( async () => {
      await getInitialData();
      const { id, time } = params;
      setDispatchesId(id);
      setAssignedDate(moment(time).format('YYYY-MM-DD'))

    }, [])

    // Initial loading function
    const getInitialData = async () => {

        const token = sessionStorage.getItem(authTokenKey);
        setAuthToken(token);
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
                // console.log(clients);
                // console.log(clientsList);
            }
        })
    }

    // Runs when choosing the client
    const onClientSelect = (item) => {
        // console.log('CLIENT::', item);
        setSelectedClient(item.id)
        setFindItemData(
                {
                    clientId: item.id,
                    dispatchesId: dispatchesId,
                    assigningDate: assignedDate
                }
        )
    }

    // Runs when find items button is tapped
    const onFindItems = async (id, assigned, time) => {
        setLoading(true);
        setTotalPrice(null);
        setisSubmitVisible(false);
        await assignedItems(findItemData, authToken)
        .then((res) => {
           const { success, data } = res;
           if(success) {
               console.log(data);
               if(data.length !== 0) {
                   let filtered = [];
                   for (let i = 0; i < data.length; i++) {
                    filtered = [...filtered, {
                        id: data[i].id,
                        itemId: data[i].item_id,
                        category_name: data[i].category_name,
                        box_no: data[i].box_no,
                        dispatchBoxId: data[i].dispatch_box_id,
                        price: 0,
                        quantity: data[i].quantity,
                        transportCost: 0,
                        total: null
                    }];
                    setAssignedItemsData(filtered);
                    setLoading(false);
                    }
               }
               else {
                   alert('No data')
                   setAssignedItemsData([]);
                   setLoading(false);
               }
           }
           else {
               alert(res.message)
           }
        })
        // console.log(assignedItemsData);
    }

    // Runs when item price is edited
    const onChangePrice = async (price, item) => {
        let assignedItemsData_copy = [...assignedItemsData];
        const index = assignedItemsData_copy.indexOf(item);
        console.log('On price change::', assignedItemsData_copy[index]);
        
        assignedItemsData_copy[index] = 
            {
                ...assignedItemsData_copy[index],
                itemId: item.itemId,
                price: price,
                transportCost: item.transportCost,
                dispatchBoxId: item.dispatchBoxId
            }

        // Validating if submit button has to show or not
        let isPrice = validatePrices(assignedItemsData_copy)
        if(isPrice) {
            setisSubmitVisible(true)
        }
        else {
            setisSubmitVisible(false)
        }
        await assignPrice(assignedItemsData_copy[index], authToken)
        .then((res) => {
            const { success, quantity, total } = res;
            if(success) {
                assignedItemsData_copy[index] = {
                    ...assignedItemsData_copy[index],
                    quantity: quantity,
                    total: total
                }
                setAssignedItemsData(assignedItemsData_copy);
                let totalPrice = [];
                assignedItemsData_copy.forEach(element => {
                    totalPrice = [
                        ...totalPrice,
                        element.total
                    ]
                });
                const sum = totalPrice.reduce((a, b) => a+b );
                setTotalPrice(sum)

                // console.log("TOTAL PRICE ", totalPrice);

            }            
        })
    }

    // Runs when transport quantity is edited
    const onChangeQuantity = async (qty, item) => {
        let assignedItemsData_copy = [...assignedItemsData];
        const index = assignedItemsData_copy.indexOf(item);
        // console.log('On qty change::', assignedItemsData_copy[index]);
        assignedItemsData_copy[index] = 
            {
                ...assignedItemsData_copy[index],
                itemId: item.itemId,
                price: item.price,
                transportCost: qty,
                dispatchBoxId: item.dispatchBoxId
            }

        // Validating if submit button has to show or not
        let isPrice = validatePrices(assignedItemsData_copy)
        if(isPrice) {
            setisSubmitVisible(true)
        }
        else {
            setisSubmitVisible(false)
        }

        await assignPrice(assignedItemsData_copy[index], authToken)
        .then((res) => {
            const { success, quantity, total } = res;
            if(success) {
                assignedItemsData_copy[index] = {
                    ...assignedItemsData_copy[index],
                    quantity: quantity,
                    total: total
                }
                setAssignedItemsData(assignedItemsData_copy)
                let totalPrice = [];
                assignedItemsData_copy.forEach(element => {
                    totalPrice = [
                        ...totalPrice,
                        element.total
                    ]
                });
                const sum = totalPrice.reduce((a, b) => a+b );
                setTotalPrice(sum)
            }            
        })
    }

    const validatePrices = (data) => {
        let price = true;
        data.forEach((ele) => {
            if (ele.price == "") {
                price = false;
            }
            if (ele.transportCost == "") {
                price = false;
            }
        })
        return price;
    };

    // Runs on submiting the price
    const onSubmit = async () => {
        setLoading(true);
       if (assignedItemsData.length !== 0) {
                let itemsPricing = [];
                assignedItemsData.forEach(element => {
                    itemsPricing = [...itemsPricing, {
                        itemId: element.itemId,
                        price: element.price,
                        dispatchBoxId: element.dispatchBoxId,
                        transportCost: element.transportCost,
                        total: element.total
                    }]
                });
                await assignCalculatedPrice(selectedClient, itemsPricing, authToken).then((res) => {
                    const {success, message} = res;
                    if (success) {
                        setLoading(false);
                        alert(message);
                        setAssignedItemsData([]);
                        history.goBack();

                    } else {
                        alert(message);
                        setAssignedItemsData([]);
                        setLoading(false);
                    }
                })
        } else {
            alert('Please find the items to be assigned')
        }
    }
    return(
        <div className="assign-to-customer-container">
            <Navbar title='Assign price'/>
            <div className="container">
                {loading ? <Loader/> : 
                    <div className="dispatches-option-sec assign-price-option-sec">
                        <div className="assign-price-select-sec">
                            <div className="assign-price-option-text">
                                <p>Select a client</p>
                            </div>
                            <div className="assign-price-option-menu">
                                <Select 
                                    options={clientsList}
                                    className="assign-price-input-select" 
                                    onChange={ (item, index) => onClientSelect(item) }
                                    // value={{ value: currentOption, label: currentOption }}                                                   
                                />
                            </div>
                        </div>
                        <div className="assign-price-find-btn">
                            <button 
                                className="btn btn-primary dispatches-assign-btn" 
                                type="submit"
                                onClick={() => onFindItems()}
                                >
                                <p>Find items</p>
                                <i className="fas fa-arrow-right" style={{ marginLeft: 10 }}></i>
                            </button>
                        </div>
                    
                    </div>
                }
                
                {loading ? <loader/> : 
                    <div className="assign-price-content" 
                        style={{display: assignedItemsData.length !== 0 ? 'block' : 'none'}}>
                        <div className="assign-price-item-label-sec">
                            <div className="assign-price-item">
                                <p>Item</p>
                            </div>
                            <div className="assign-price-item">
                                <p>Price/BN</p>
                            </div>
                            <div className="assign-price-item">
                                <p>QTY Transport</p>                            
                            </div>
                            <div className="assign-price-item">
                                <p>Total</p>
                            </div>
                        </div>
                
                        {assignedItemsData && assignedItemsData.map((item, index) => {
                            return(
                                <div className="assign-price-item-sec" key={index}>
                                    <div className="assign-price-item">
                                        <div className="inner-price-item">
                                            <p>{item.category_name}</p>
                                        </div>
                                    </div>
                                    <div className="assign-price-item">
                                        <input 
                                            type="number" 
                                            placeholder="Price/punch" 
                                            className="form-control" 
                                            aria-label="Small" 
                                            aria-describedby="inputGroup-sizing-sm"
                                            onChange={(val) => onChangePrice(val.target.value, item)}
                                            value={item.price}
                                        />
                                        <p>*{item.quantity}</p>
                                    </div>
                                    <div className="assign-price-item">
                                        <input 
                                            type="number" 
                                            placeholder="Transport" 
                                            className="form-control" 
                                            aria-label="Small" 
                                            aria-describedby="inputGroup-sizing-sm"
                                            onChange={(val) => onChangeQuantity(val.target.value, item)}
                                            value={item.transportCost}
                                        />
                                    </div>
                                    <div className="assign-price-item">
                                        <p>{item.total ? item.total : '-- ₹'}</p>
                                    </div>
                                </div>
                            )
                        })}                                                        
                    </div>
                }

                

                <div className="assign-price-item-sec assign-price-total"
                    style={{display: assignedItemsData.length !== 0 ? 'flex' : 'none'}}>
                        <h4>TOTAL : { totalPrice != null ? <span style={{color: 'green'}}>{totalPrice} ₹</span> : '--' }</h4>
                </div>

                <div className="dispatch-footer">
                    <div className="button-container">
                        <div className="container"style={{display: isSubmitVisible ? 'block' : 'none'}}>
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

export default AssignPrice;