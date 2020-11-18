import {ACCESS_TOKEN, ROLES} from "../constants"

const initialState = {
    clothes: [],
    loading: true,
    categories: [],
    token: localStorage.getItem(ACCESS_TOKEN),
    roles: localStorage.getItem(ROLES),
    cart: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CLOTH_LIST":
            return {
                ...state,
                clothes: action.payload,
                loading: false
            }
        case "CLOTH_REQUESTED":
            return {
                ...state,
                clothes: state.clothes,
                loading: true
            }    
        case "CATEGORY_LIST": 
            return {
                ...state,
                categories: action.payload
            }
        case "USER_LOADED":
            return {
                ...state,
                token: action.token,
                roles: action.roles
            }
        case "CLOTH_TO_CART":
            const clothToAdd = action.payload

            const isExists = state.cart.find(item => item.id === clothToAdd.id)

            if (isExists) {
                return {
                    ...state
                }
            }
            const newClothInCart = {
                id: clothToAdd.id,
                age: clothToAdd.age,
                height: clothToAdd.height,
                amount: clothToAdd.amount
            }
            return {
                ...state,
                cart: [...state.cart, newClothInCart]
            }
        case "DELETE_CLOTH_FROM_CART":
            const clothId = action.payload
            const itemIndex = state.cart.findIndex(item => item.id === clothId)

            if (!itemIndex) {
                return {
                    ...state
                }
            }
            return {
                ...state,
                items: [
                    ...state.cart.slice(0, itemIndex),
                    ...state.cart.slice(itemIndex + 1)
                ]
            }         
        default:
            return state 
    }
}

export default reducer