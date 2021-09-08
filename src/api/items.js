import { baseUrl, headers } from '../configuration/index';

export const getItemsList = async (token) => {

    //fetching data from the api
        const URL = `${baseUrl}/items-list`;
        const requestOptions = {
            method: 'get',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json', token: token},
        };
    
        return await fetch(URL, requestOptions)
        .then((response) => response.json())
        .then((resData) => {
            return resData;
        });
    }