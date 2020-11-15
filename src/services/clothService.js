export default class ClothService {

    state = {
        defaultUrl: "http://localhost:8983"    
    }

    getClothes = async () => {
        const {defaultUrl} = this.state
        const responseJson = fetch(
            `${defaultUrl}/clothes`, 
            {method: "GET", headers: {"Content-Type":"application/json"}}
        ).then(response => response.json())
        return await JSON.parse(responseJson)
    }

    getClothesBySex = async (sex) => {
        const {defaultUrl} = this.state
        const responseJson = fetch(
            `${defaultUrl}/clothes/searching`,
            {method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({sex: sex})}
        ).then(response => response.json())
        return await JSON.parse(responseJson)
    }
}