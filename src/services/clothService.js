export default class ClothService {

    _defaultUrl = "http://localhost:8983"    

    getResource = async (url) => {
        const res = await fetch(`${this._defaultUrl}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }
    
    performRequest = async (method, headers, body, url = "/clothes/searching") => {
        const searchingDefaultUrl = `${this._defaultUrl}${url}`

        const res = await fetch(searchingDefaultUrl, {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        });
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${searchingDefaultUrl}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    getClothes = async () => {
        return await this.getResource("/clothes")
    }

    getPromotions = async () => {
        return await this.getResource("/promotions")
    }

    getClothesBySex = async (sex) => {
        return await this.performRequest(
            "POST",
            {"Content-Type":"application/json"},
            {sex: sex} 
        )
    }

    getClothesByCategory = async (category) => {
        return await this.performRequest(
            "POST",
            {"Content-Type":"application/json"},
            {category: category} 
        )
    }

    getClothesByCategoryAndSex = async (sex, category) => {
        return await this.performRequest(
            "POST",
            {"Content-Type":"application/json"},
            {category: category, sex: sex}
        )
    }
}