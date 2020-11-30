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

    performFileRequestSaving = async (url, file, headers) => {
        const finalUrl = `${this._defaultUrl}${url}`

        const res = await fetch(finalUrl, {
            method: "POST",
            body: file,
            headers: headers
        })

        if (!res.ok) {
            throw new Error(`Could not fetch ${finalUrl}` +
              `, received ${res.status}`);
          }

        return res
    }

    performDeleteRequest = async (url, headers) => {
        const finalUrl = `${this._defaultUrl}${url}`

        return await fetch(finalUrl, {
            method: "DELETE",
            headers: headers
        })
    }

    getClothes = async () => {
        return await this.getResource("/clothes")
    }

    getPromotions = async () => {
        return await this.getResource("/promotions")
    }

    getClothesBySex = async (gender) => {
        return await this.performRequest(
            "POST",
            {"Content-Type":"application/json"},
            {gender: gender} 
        )
    }

    getClothesByCategory = async (category) => {
        return await this.performRequest(
            "POST",
            {"Content-Type":"application/json"},
            {category: category} 
        )
    }

    getClothesByCategoryAndSex = async (gender, category) => {
        return await this.performRequest(
            "POST",
            {"Content-Type":"application/json"},
            {category: category, gender: gender}
        )
    }
}