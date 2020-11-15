const initialState = {
    clothes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CLOTH_LIST":
            return {
                clothes: action.payload
            }
        default:
            return state 
    }
}

export default reducer