import {ACCESS_TOKEN, ROLES} from "../constants"

const initialState = {
    clothes: [],
    loading: true,
    categories: [],
    token: localStorage.getItem(ACCESS_TOKEN),
    roles: localStorage.getItem(ROLES)
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
        default:
            return state 
    }
}

export default reducer