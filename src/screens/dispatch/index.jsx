import React, {useState} from 'react';
import DatePicker from 'react-date-picker'
import Select from 'react-select'



import './style.css';

const DispatchScreen = () => {

    const [date, setDate] = useState(new Date());

    const options = [
        { value: 'VLG', label: 'VLG' },
        { value: 'PLG', label: 'PLG' },
        { value: 'WLG', label: 'WLG' },
      ]

    const [count, setCount] = useState(1)
    const [dispatches, setDispatches] = useState([
        {
            id: 'B' + `${1}`.padStart(3, '0'),
            items: [
                {
                    id: 0,
                    value_one: 'PLG',
                    value_two: null
                }
            ]
            
        }
    ])


    // ADD BOXES
    const addBoxes = () => {
        setDispatches([
            ...dispatches ,
             {
                 index: dispatches.length,
                 id: 'B' + `${dispatches.length+1}`.padStart(3, '0'),
                 items: [
                     {
                         id: 0,
                         value_one: 'PLG',
                         value_two: null
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
        const lastItem = dispatches[currentIndex].items[lastIndex].value_one
        // console.log(lastItem)
        let duplicateItems = [...dispatches]
        duplicateItems[currentIndex].items = [
            ...duplicateItems[currentIndex].items, {
                id: duplicateItems[currentIndex].items.length,
                value_one: lastItem,
                value_two: null
            }
        ]
        setDispatches(duplicateItems);
        // console.log(duplicateItems)
    }

    // STORE ITEM NAME TO THE ARRAY (Eg: VLG)
    const itemNameHandler = (item, itemVal, isParent, childItem) => {
        
        const currentIndex = dispatches.indexOf(item)
        const dispatchCopy = [...dispatches];
        if(isParent) {
            dispatchCopy[currentIndex].items[0].value_one = itemVal.value
        }
        else {
            const index = dispatchCopy[currentIndex].items.indexOf(childItem)
            dispatchCopy[currentIndex].items[index].value_one = itemVal.value;
           
        }
        setCount(count+1)
    }

    return(
        <div className="dispatch-container">
            <div className="container">
                <div className="dispatch-content">
                    <div className="row">
                        <div className="dispatch-date-section">
                            <div className="col-lg-3 col-sm-12">
                                <div className="dispatch-date">
                                    <h5>Choose a Date</h5>
                                    <DatePicker
                                        onChange={setDate}
                                        value={date}
                                        className="date-picker"                    
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
                                                <div className="col-2">
                                                    <div className="dispatch-id-section">
                                                    <p>{item.id}</p>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="dispatch-item-name-section">
                                                        <Select 
                                                            options={options}
                                                            className="dispatch-input-select"
                                                            onChange={ (itemVal, itemIndex, isParent=true ) => {itemNameHandler(item, itemVal, isParent)} }
                                                            value={{ value: item.items[0].value_one, label: item.items[0].value_one }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="dispatch-item-quantity-section">
                                                        <input type="text" placeholder="Enter quantity" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                                                    </div>
                                                </div>
                                                <div className="col-2">
                                                    <div className="dispatch-icon-section">
                                                        <i className="far fa-trash-alt" style={{fontSize: "20px"}} onClick={() => deleteBoxes(item)}></i>
                                                        <i className="far fa-clone" style={{fontSize: "20px"}} onClick={() => duplicateBoxes(item)}></i>
                                                    </div>
                                                </div>
                                        </div>
                                        {item ? item.items.slice(1).map((val) =>{
                                            return(
                                                <div className="row inner-dispatch-box">
                                                    <div className="col-2">
                                                        <div className="dispatch-id-section">
                                                            <p></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="dispatch-item-name-section">
                                                            <Select 
                                                                options={options}
                                                                className="dispatch-input-select"
                                                                onChange={ (itemVal, itemIndex, isParent=false ) => {itemNameHandler(item, itemVal, isParent,val )} }
                                                                value={{ value: val.value_one, label: val.value_one }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="dispatch-item-quantity-section">
                                                            <input type="text" placeholder="Enter quantity" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        
                                                    </div>
                                                </div>
                                            )
                                        }) : null                                                                                                                                                                                                                                                                                                                                                                                                               }
                                        
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
                                    <button type="button" class="btn btn-primary " onClick={addBoxes}><i class="fas fa-plus" style={{ marginRight: 10 }}></i>Add box</button>
                                </div>
                                <div className="col-6">
                                    <button type="button" class="btn btn-secondary "><i class="fas fa-check" style={{ marginRight: 10 }}></i>Submit</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DispatchScreen;