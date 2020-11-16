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
}