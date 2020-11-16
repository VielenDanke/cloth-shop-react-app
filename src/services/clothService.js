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

    getClothes = async () => {
        return await this.getResource("/clothes")
    }

    getClothesBySex = async (sex) => {
        return await fetch(
            `${this._defaultUrl}/clothes/searching`,
             {method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({sex: sex})}
            ).then(res => res.json())
    }
}