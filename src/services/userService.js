export default class UserService {

    _defaultUrl = "http://localhost:8983"

    getResource = async (url) => {
        const res = await fetch(`${this._defaultUrl}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return res;
    }
    
    getConfigurableResource = async (url, method, headers, body) => {
        const searchingDefaultUrl = `${this._defaultUrl}${url}`

        let requestObj = {
            method: method,
            headers: headers,
        }

        if (body != null) {
            requestObj = {
                ...requestObj,
                body: JSON.stringify(body)
            }
        }

        const res = await fetch(searchingDefaultUrl, requestObj);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${searchingDefaultUrl}` +
            `, received ${res.status}`);
        }
        return res;
    }

    getUserInSession = async (url, method, headers) => {
        const searchingDefaultUrl = `${this._defaultUrl}${url}`

        const res = await fetch(searchingDefaultUrl, {
            method: method,
            headers: headers
        });
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${searchingDefaultUrl}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }
}