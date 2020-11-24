const initialState = {
    clothes: [],
    loading: true,
    categories: [],
    token: "",
    roles: "",
    cart: [],
    promotions: []
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
                cart: [
                    ...state.cart.slice(0, itemIndex),
                    ...state.cart.slice(itemIndex + 1)
                ]
            }     
        case "LOGOUT":
            return {
                ...state,
                token: action.token,
                roles: action.roles
            } 
        case "PROMOTION_UPLOADED":
            return {
                ...state,
                promotions: action.payload
            }   
        case "ADD_PROMOTION":
            const promotion = action.payload

            const newPromArray = [...state.promotions, promotion]

            return {
                ...state,
                promotions: newPromArray
            }     
        case "DELETE_PROMOTION":
            const promotionId = action.payload
            
            const promotionIndex = state.promotions.findIndex(prom => prom.id === promotionId)
           
            return {
                ...state,
                promotions: [
                    ...state.promotions.slice(0, promotionIndex),
                    ...state.promotions.slice(promotionIndex + 1)
                ]
            }   
        case "DELETE_CLOTH":
            const clothIdToDelete = action.payload
            
            const clothIndex = state.clothes.findIndex(item => item.id === clothIdToDelete)

            if (!clothIndex) {
                return {
                    ...state
                }
            }
            return {
                ...state,
                clothes: [
                    ...state.clothes.slice(0, clothIndex),
                    ...state.clothes.slice(clothIndex + 1)
                ]
            }   
        default:
            return state 
    }
}

export default reducer