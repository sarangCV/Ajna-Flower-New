import React, { useEffect, useState } from 'react'
import './style.css'

import Navbar from '../../components/nav-bar';

import { getDispatches } from '../../api/dispatch'
import { authTokenKey } from '../../configuration'
import moment from 'moment'
import Select from 'react-select';
import { useHistory } from 'react-router';
import Loader from '../../components/loader';


const Dispatches = () => {

    const history = useHistory();

    const [loading, setLoading] = useState(true)
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
        setLoading(true);
        const token = sessionStorage.getItem(authTokenKey);
        setAuthToken(token);
        getDispatches(token)
        .then((res) => {
            const {success, dispatches} = res;
            if (success) {
                setAllDispatches(dispatches);
                filterDispatch(dispatches, false);
                setLoading(false);
            } else {
                alert(res.message)
            }
        })
        console.log('dispatches list::', filteredDispatches);
    }

    const filterDispatch = (data, status) => {
        const filteredDispatch = data.filter((item) => item.assigned == status);
        const sorted = filteredDispatch.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        console.log('SORTED::', sorted);
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
            {loading ? <Loader loading={loading}/> : 
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
                                    <div className="dispatch-single-desk" style={{ backgroundColor: currentOption == 'Available' ? '#fff' : '#83ab83', border: currentOption == 'Available' ? 'none' : '1px solid #286928' }}>
                                        <div className="dispatches-date">
                                            <p style={{ color: currentOption == 'Available' ? '#000' : 'rgb(0 0 0 / 75%)' }} >{moment(time).format('Do')}</p>
                                            <p style={{ color: currentOption == 'Available' ? '#000' : 'rgb(0 0 0 / 75%)' }}>{moment(time).format('MMMM')}</p>
                                        </div>
                                        <div className="dispatches-boxes">
                                            <p style={{ color: currentOption == 'Available' ? '#000' : 'rgb(0 0 0 / 75%)' }}>Boxes</p>
                                        </div>
                                        <div className="dispatches-action">
                                            <button 
                                                className="btn btn-primary dispatches-assign-btn" 
                                                type="submit"
                                                onClick={() => assignItems(id, assigned, time)}
                                                style={{ backgroundColor: currentOption == 'Available' ? '#0d6efd' : '#396739', borderColor: currentOption == 'Available' ? 'none' : '#396739' }}>
                                                <p >{currentOption == 'Available' ? ' Assign boxes to customer' : 'Assign price'}</p>
                                                <i className="fas fa-arrow-right" style={{ marginLeft: 10 }}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                            
                </div>
            }
            
        </div>
    )
}

export default Dispatches
