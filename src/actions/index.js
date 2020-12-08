import {ACCESS_TOKEN, ROLES} from "../constants"

const categoryLoaded = (categories) => {
    return {
        type: "CATEGORY_LIST",
        payload: categories
    }
}

const userLoaded = (token, roles) => {
    return {
        type: "USER_LOADED",
        token: token,
        roles: roles
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

const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(ROLES)
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
    clearCart
}