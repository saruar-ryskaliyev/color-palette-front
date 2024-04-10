const BASE_URL = 'http://localhost:8000'; // Define the base URL only once

export const apiRequest = async (endpoint, method, data, isJson = true) => {
    const url = `${BASE_URL}${endpoint}`;
    let headers = {};
    let body;

    if (method === 'DELETE'){
        headers['Accept'] = 'application/json';
        body = JSON.stringify(data);
    }
    else if (isJson) {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(data);
    } else {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        body = Object.keys(data).map(
            key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        ).join('&');
    }

    const options = {
        method: method,
        headers: headers,
        body: method !== 'GET' ? body : null,
    };

    try {
        const response = await fetch(url, options);

        // Try to parse the response body as JSON
        let jsonData;
        try {
            jsonData = await response.json();
        } catch (error) {
            if (response.ok) {
                // If the response is okay, but the body isn't JSON, return an empty object or some other default value
                return {};
            } else {
                // If the response is not okay, throw an error
                throw new Error('Server responded with an error');
            }
        }

        // Only throw an error if the response status code is not a success
        if (response.ok) {
            return jsonData;
        } else {
            throw new Error(jsonData.error || 'Server responded with an error');
        }
    } catch (error) {
        // Log or handle the error as appropriate
        console.error('Fetch error:', error);
        throw error;
    }
};
