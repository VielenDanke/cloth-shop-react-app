const categoryLoaded = (categories) => {
    return {
        type: "CATEGORY_LIST",
        payload: categories
    }
}

const addCategory = (category) => {
    return {
        type: "ADD_CATEGORY",
        payload: category
    }
}

const userLoaded = (token, roles) => {
    return {
        type: "USER_LOADED",
        token: token,
        roles: roles
    }
}

const updateUserWithToken = (token) => {
    return {
        type: "USER_UPDATE_WITH_TOKEN",
        payload: token
    }
}

const addClothToCart = (cloth) => {
    return {
        type: "CLOTH_TO_CART",
        payload: cloth
    }
}

const deleteClothFromCart = (clothId) => {
    return {
        type: "DELETE_CLOTH_FROM_CART",
        payload: clothId
    }
}

const clearCart = () => {
    return {
        type: "CLEAR_CART"
    }
}

const addStateID = (stateID) => {
    return {
        type: "ADD_STATE_ID",
        payload: stateID
    }
}

const removeStateID = () => {
    return {
        type: "REMOVE_STATE_ID"
    }
}

const logout = () => {
    return {
        type: "LOGOUT",
        token: "",
        roles: ""
    }
}

export {
    categoryLoaded,
    userLoaded,
    addClothToCart,
    deleteClothFromCart,
    logout,
    clearCart,
    addStateID,
    removeStateID,
    updateUserWithToken,
    addCategory
}