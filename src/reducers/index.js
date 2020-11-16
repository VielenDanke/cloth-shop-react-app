const initialState = {
    clothes: [],
    loading: true,
    categories: []
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
        default:
            return state 
    }
}

export default reducer