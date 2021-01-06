export default class CategoryService {
    
    _defaultUrl = "http://localhost:8983/categories"    

    getResource = async (url = "") => {
        const res = await fetch(`${this._defaultUrl}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    getAllCategories = async () => {
        return await this.getResource()
    }

    addCategory = async (method, headers, body, url = "") => {
        const searchingDefaultUrl = `${this._defaultUrl}${url}`
        const res = await fetch(searchingDefaultUrl, {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        });
        if (res.status !== 201) {
            throw new Error(`Could not fetch ${searchingDefaultUrl}` +
            `, received ${res.status}`);
        }
        return await res.json()
    }
}