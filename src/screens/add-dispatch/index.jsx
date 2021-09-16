import React, {useState, useEffect} from 'react';
import DatePicker from 'react-date-picker'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'

import './style.css';
import { authTokenKey } from '../../configuration';
import { getItemsList } from '../../api/items';

import moment from 'moment';
import { dispatchData } from '../../api/dispatch';

import Navbar from '../../components/nav-bar';

moment.locale('en-IN');


const AddDispatchScreen = () => {

    const history = useHistory();
    const [date, setDate] = useState(new Date());

    const [loading, setLoading] = useState(true)
    const [selectedItemValue, setSelectedItemValue] = useState(1);
    const [authToken, setAuthToken] = useState(null)
    const [categories, setCategories] = useState(null)
    const [dispatchItemsList, setDispatchItemsList] = useState([])    

    const [count, setCount] = useState(1)
    const [dispatches, setDispatches] = useState([])

    useEffect(() => {
        getDispatchItemList();
    }, [])

    const getDispatchItemList = async () => {
        const token = await sessionStorage.getItem(authTokenKey)
        await setAuthToken(token);
        getItemsList(token).then((res) => {
            const {success, categoriesList} = res;
            if (success) {
                setCategories(categoriesList)
                let dispatchItems = []
                categoriesList.map((val) => {
                   dispatchItems = [...dispatchItems,
                       {
                           value: val.name,
                           label: val.name,
                           id: val.id
                       }
                   ]
                })
                // console.log('DISPATCJ LIST::', dispatchItems);
                 setDispatchItemsList(dispatchItems)
                 setDispatches([{
                    id: "B" + `${1}`.padStart(3, '0'),
                    items: [
                        {
                            id: categoriesList[0].id,
                            name: categoriesList[0].name,
                            qty: 0
                        }
                    ]
                }])
            } else {
                alert(res.message)
            }
        })
    }

    // ADD BOXES
    const addBoxes = () => {
        const {id, name} = categories[0]
        setDispatches([
            ...dispatches ,
             {
                 index: dispatches.length,
                 id: 'B' + `${dispatches.length+1}`.padStart(3, '0'),
                 items: [
                     {
                         id: id,
                         name: name,
                         qty: 0
                     }
                 ]
            }
        ]);
    }

    // DELETE BOXES
    const deleteBoxes = (item) => {
        const index = dispatches.indexOf(item);
        const filteredDispatches = dispatches.filter((val) => val != dispatches[index])
        for (let i = 0; i < filteredDispatches.length; i++) {
            // filteredDispatches[i].index = i;
            filteredDispatches[i].id = 'B' + `${i+1}`.padStart(3, '0')
        }
        setDispatches(filteredDispatches)
        console.log(filteredDispatches)
    }

    // DUPLICATE BOXES
    const duplicateBoxes = (item) => {
        const currentIndex = dispatches.indexOf(item)
        const lastIndex = dispatches[currentIndex].items.length-1
        const lastItem = dispatches[currentIndex].items[lastIndex].name
        const lastId = dispatches[currentIndex].items[lastIndex].id
        const lastQty = dispatches[currentIndex].items[lastIndex].qty
        let duplicateItems = [...dispatches]
        duplicateItems[currentIndex].items = [
            ...duplicateItems[currentIndex].items, {
                id: lastId,
                name: lastItem,
                qty: lastQty
            }
        ]
        setDispatches(duplicateItems);
        console.log(dispatches);
    }

    // STORE ITEM NAME TO THE ARRAY (Eg: VLG)
    const itemNameHandler = (item, itemVal, isParent, childItem) => {
        
        const currentIndex = dispatches.indexOf(item)
        const dispatchCopy = [...dispatches];
        if(isParent) {
            dispatchCopy[currentIndex].items[0].id = itemVal.id
            dispatchCopy[currentIndex].items[0].name = itemVal.value
            console.log(dispatches);
        }
        else {
            const index = dispatchCopy[currentIndex].items.indexOf(childItem)
            dispatchCopy[currentIndex].items[index].id = itemVal.id;
            dispatchCopy[currentIndex].items[index].name = itemVal.value;
            console.log(dispatches);
        }
        setCount(count+1)
    }

    // STORE ITEM QUANTITY TO THE ARRAY
    const itemQuantityHandler = (item, itemVal, isParent, childItem) => {
        const currentIndex = dispatches.indexOf(item)
        const dispatchCopy = [...dispatches];
        if(isParent) {
            dispatchCopy[currentIndex].items[0].qty = itemVal.target.value;
            setSelectedItemValue(selectedItemValue + 1);

        }
        else {
            const index = dispatchCopy[currentIndex].items.indexOf(childItem)
            dispatchCopy[currentIndex].items[index].qty = itemVal.target.value;
            setSelectedItemValue(selectedItemValue + 1);
           
        }
        // console.log(itemVal.target.value);
    }

    //  ----------------------------- VALIDATION -----------------------------//

    const validateDate = () => {
        if (date !== null) {
            return true
        }
    };

    const validateQty = () => {
        let qty = true;
        dispatches.forEach((ele) => {
            ele.items.forEach((i) => {
                if (i.qty == "") {
                    qty = false;
                }
            })
        })
        return qty
    };

    //  ----------------------------- VALIDATION END -----------------------------//


    const submit = () => {
        // history.push('/assign-to-customer')
        // console.log(moment(date).format('YYYY-MM-DD h:mm:ss'), dispatches);

        let isDate = validateDate();
        let isQty = validateQty();
        if (dispatches.length !== 0) {
            if (isDate) {
                if (isQty) {
                    setLoading(true)
                    dispatchData(moment(date).format('YYYY-MM-DD h:mm:ss'), dispatches, authToken).then((res) => {
                        console.log(dispatches, date)
                        setLoading(false)
                        const {success, message} = res;
                        if (success) {
                           alert('DISPATCHED SUCCESSFULLY');
                        } else {
                            console.log("DISPATCH FAILED");
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                    // console.log(moment(date).format('YYYY-MM-DD h:mm:ss'), dispatches);
                } else {
                    alert('Please enter a quantity')
                }
            } else {
                alert('Please select a date')
            }
        } else {
            alert('Please add an item')
        }
    }

    return(
        <div className="dispatch-container">
            <Navbar title='Add a dispatch'/>
            <div className="container">
                <div className="dispatch-content">
                    <div className="row">
                        <div className="dispatch-date-section">
                            <div className="col-lg-3 col-sm-12">
                                <div className="dispatch-date">
                                    <h5>Choose a Date</h5>
                                    <DatePicker
                                        onChange={(date)=> {setDate(date)}}
                                        value={date}
                                        className="date-picker"  
                                        // formatLongDate={(locale, date) => formatDate(date, 'yyyy-mmm-dd')}                  
                                    />   
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="dispatch-box-section">
                            {dispatches.map((item) => {
                                return(
                                    <div className="single-box-section" key={item.id}>
                                        <div className="row inner-dispatch-box">
                                                <div className="col-1">
                                                    <div className="dispatch-id-section">
                                                        <p>{item.id}</p>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="dispatch-item-name-section">
                                                        <Select 
                                                            options={dispatchItemsList}
                                                            className="dispatch-input-select"
                                                            onChange={ (itemVal, itemIndex, isParent=true ) => {itemNameHandler(item, itemVal, isParent)} }
                                                            value={{ value: item.items[0].name, label: item.items[0].name }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="dispatch-item-quantity-section">
                                                        <input 
                                                            type="text" 
                                                            placeholder="Enter qty" 
                                                            className="form-control" 
                                                            aria-label="Small" 
                                                            aria-describedby="inputGroup-sizing-sm"
                                                            onChange={ (itemVal, itemIndex, isParent=true ) => {itemQuantityHandler(item, itemVal, isParent)} }
                                                            value={item.items[0].qty}
                                                            />
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="dispatch-icon-section">
                                                        <p>Delete</p>
                                                        <i className="far fa-trash-alt" style={{fontSize: "20px"}} onClick={() => deleteBoxes(item)}></i>
                                                        <p>Duplicate</p>
                                                        <i className="far fa-clone" style={{fontSize: "20px"}} onClick={() => duplicateBoxes(item)}></i>
                                                    </div>
                                                </div>
                                        </div>
                                        {item ? item.items.slice(1).map((val) =>{
                                            return(
                                                <div className="row inner-dispatch-box" key={val.id}>
                                                    <div className="col-1">
                                                        <div className="dispatch-id-section">
                                                            <p></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="dispatch-item-name-section">
                                                            <Select 
                                                                options={dispatchItemsList}
                                                                className="dispatch-input-select"
                                                                onChange={ (itemVal, itemIndex, isParent=false ) => {itemNameHandler(item, itemVal, isParent,val )} }
                                                                value={{ value: val.name, label: val.name }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="dispatch-item-quantity-section">
                                                            <input 
                                                                type="text" 
                                                                placeholder="Enter qty" 
                                                                className="form-control" 
                                                                aria-label="Small" 
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                onChange={ (itemVal, itemIndex, isParent=false ) => {itemQuantityHandler(item, itemVal, isParent,val )} }
                                                                value={val.qty}
                                                                />
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        
                                                    </div>
                                                </div>
                                            )
                                        }) : null                                                                                                                                                                                                                                                                                                                                                                                                          }
                                        
                                    </div>
                                )
                            })}
                           
                        </div>
                    </div>
                </div>

                <div className="dispatch-footer">
                    <div className="button-container">
                        <div className="container">
                            <div className="row d-flex justify-content-center">
                                <div className="col-6 d-flex flex-column align-items-end">
                                    <button type="button" className="btn btn-primary " onClick={addBoxes}><i className="fas fa-plus" style={{ marginRight: 10 }}></i>Add box</button>
                                </div>
                                <div className="col-6">
                                    <button type="button" className="btn btn-secondary" onClick={submit}><i className="fas fa-check" style={{ marginRight: 10 }}></i>Submit</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDispatchScreen;