const initialState = {
    loading: true,
    categories: [],
    token: "",
    roles: "",
    cart: [],
    promotions: [],
    stateID: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CATEGORY":
            return {
                ...state,
                categories: [...state.categories, action.payload]
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
                amount: clothToAdd.amount,
                price: clothToAdd.price
            }
            return {
                ...state,
                cart: [...state.cart, newClothInCart]
            }
        case "DELETE_CLOTH_FROM_CART":
            const clothId = action.payload
            const itemIndex = state.cart.findIndex(item => item.id === clothId)

            return {
                ...state,
                cart: [
                    ...state.cart.slice(0, itemIndex),
                    ...state.cart.slice(itemIndex + 1)
                ]
            }
        case "CLEAR_CART":
            return {
                ...state,
                cart: []
            }         
        case "ADD_STATE_ID":
            return {
                ...state,
                stateID: action.payload
            }    
        case "REMOVE_STATE_ID":
            return {
                ...state,
                stateID: ""
            }    
        case "LOGOUT":
            return {
                ...state,
                token: action.token,
                roles: action.roles
            }
        case "USER_UPDATE_WITH_TOKEN":
            return {
                ...state,
                token: action.payload
            }      
        default:
            return state 
    }
}

export default reducer