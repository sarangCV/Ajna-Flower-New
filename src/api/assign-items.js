import { baseUrl } from '../configuration';

export const assignedItems = async (assignedItems, token) => {
    const URL = `${baseUrl}/master/assigned-item`;
    const requestOptions = {
        method: 'post',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json',token},
        body: JSON.stringify(assignedItems)

    };

    return await fetch(URL, requestOptions)
    .then((response) => response.json())
    .then((resData) => {
        return resData;
    });
};

// Assign boxes to customer
export const assignItems = async (dispatchId, clientId, assignedItems, token) => {
    const URL = `${baseUrl}/master/assign-item`;
    const requestOptions = {
        method: 'post',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json', token},
        body: JSON.stringify({dispatchId, clientId, assignedItems})
    };
    return await fetch(URL, requestOptions).then((response) => response.json()).then((resData) => {
        console.log(resData)
        return resData;
    });
};
