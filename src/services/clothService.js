export default class ClothService {
    getClothes = () => {
        return [{id: 1, name: "cloth", price: 123}]
    }

    getClothesBySex = (sex) => {
        return [{id: 1, name: `${sex} cloth`, price: 123}]
    }
}