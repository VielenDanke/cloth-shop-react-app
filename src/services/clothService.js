export default class ClothService {

    state = {
        defaultUrl: "http://localhost:8983"    
    }

    getResource = async (url) => {
        const {defaultUrl} = this.state

        const res = await fetch(`${defaultUrl}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    getClothes = async () => {
        const response = await this.getResource("/clothes")
        return await response
    }

    getClothesBySex = async (sex) => {
        const response = await this.getResource(`/clothes/${sex}`)
        return await response
    }
}