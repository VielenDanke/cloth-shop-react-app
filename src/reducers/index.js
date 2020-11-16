const initialState = {
    clothes: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CLOTH_LIST":
            return {
                clothes: action.payload,
                loading: false
            }
        case "CLOTH_REQUESTED":
            return {
                clothes: state.clothes,
                loading: true
            }    
        default:
            return state 
    }
}

export default reducer