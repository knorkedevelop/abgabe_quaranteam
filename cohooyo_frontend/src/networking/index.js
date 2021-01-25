export default async function post(apiCall, json, authToken) {
    const uriBase = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000/' : 'https://productionURL';

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    if (authToken)
        headers['Authorization'] = 'Bearer ' + authToken

    const response = await fetch(`${uriBase}/${apiCall}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(json)
    })
    
    let response_json = await response.json()
    return response_json;
}