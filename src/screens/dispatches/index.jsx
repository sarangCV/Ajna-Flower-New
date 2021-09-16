import React, { useEffect, useState } from 'react'
import './style.css'

import Navbar from '../../components/nav-bar'

import { getDispatches } from '../../api/dispatch'
import { authTokenKey } from '../../configuration'
import moment from 'moment'
import Select from 'react-select';
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const Dispatches = () => {

    const history = useHistory();

    const [authToken, setAuthToken] = useState(null)
    const [allDispatches, setAllDispatches] = useState(null)
    const [filteredDispatches, setFilteredDispatches] = React.useState(null);
    const [currentOption, setCurrentOption] = useState('Available')

    const dispatchOptions = [
        {
            value: 'Available', label: 'Available'
        },
        {
            value: 'Dispatched', label: 'Dispatched'
        }
        
    ]
    useEffect(() => {
        getInitalData();
    }, [])

    const getInitalData = () => {
        const token = sessionStorage.getItem(authTokenKey);
        setAuthToken(token);
        getDispatches(token)
        .then((res) => {
            const {success, dispatches} = res;
            if (success) {
                setAllDispatches(dispatches);
                filterDispatch(dispatches, false);
            } else {
                alert(res.message)
            }
        })
        console.log('dispatches list::', filteredDispatches);
    }

    const filterDispatch = (data, status) => {
        const filteredDispatch = data.filter((item) => item.assigned == status)
        console.log('Filtered::', filteredDispatch);
        setFilteredDispatches(filteredDispatch);
    }

    const toggleOptions = (item) => {
        setCurrentOption(item.value);
        item.value !== 'Available' ? filterDispatch(allDispatches, true) : filterDispatch(allDispatches, false);
    }

    const assignItems = (dispatchId, assigned, time) => {
        if(assigned) {
            history.push(`/assign-price/${dispatchId}/${time}`);

            // history.push({
            //     pathname: `/assign-price/${dispatchId}`,
            //     state: [{id: 1, name: 'Ford', color: 'red'}] // your data array of objects
            //   })
            // <Link to={{
            //     pathname: `/assign-price/${dispatchId}`,
            //     data: {dispatchId, assigned, time}
            // }}/>
        }
        else {
            history.push(`/assign-to-customer/${dispatchId}`);
        }

    }
    return (
        <div className="dispatches-container">
            <Navbar title='Dispatches'/>
            <div className="container">
                        <div className="dispatches-option-sec">
                            <div className="dispatches-option-text">
                                <p>Choose an option</p>
                            </div>
                            <div className="dispatches-option-menu">
                                <Select 
                                    options={dispatchOptions}
                                    className="dispatches-input-select" 
                                    onChange={ (item, index) => toggleOptions(item) }
                                    value={{ value: currentOption, label: currentOption }}                                                   
                                />
                            </div>
                            
                        </div>
                        {filteredDispatches && filteredDispatches.map((val) => {
                            const {id, time, boxes, assigned} = val;
                            return (
                                <div className="row" key={id}>
                                    <div className="container">
                                        <div className="dispatch-single-desk">
                                            <div className="dispatches-date">
                                                <p>{moment(time).format('Do')}</p>
                                                <p>{moment(time).format('MMMM')}</p>
                                            </div>
                                            <div className="dispatches-boxes">
                                                <p>Boxes</p>
                                            </div>
                                            <div className="dispatches-action">
                                                <button 
                                                    className="btn btn-primary dispatches-assign-btn" 
                                                    type="submit"
                                                    onClick={() => assignItems(id, assigned, time)}>
                                                    <p>{currentOption == 'Available' ? ' Assign boxes to customer' : 'Assign price'}</p>
                                                    <i className="fas fa-arrow-right" style={{ marginLeft: 10 }}></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>

                            )
                        })}
                        
            </div>
        </div>
    )
}

export default Dispatches
