import {ACCESS_TOKEN, ROLES} from "../constants"

const clothLoaded = (clothList) => {
    return {
        type: "CLOTH_LIST",
        payload: clothList
    }
}

const clothRequested = () => {
    return {
        type: "CLOTH_REQUESTED"
    }
}

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

const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(ROLES)
    return {
        type: "LOGOUT",
        token: "",
        roles: ""
    }
}

const promotionUploaded = (promotions) => {
    return {
        type: "PROMOTION_UPLOADED",
        payload: promotions
    }
}

const addPromotion = (promotion) => {
    return {
        type: "ADD_PROMOTION",
        payload: promotion
    }
}

const deletePromotion = (id) => {
    return {
        type: "DELETE_PROMOTION",
        payload: id
    }
}

const deleteCloth = (id) => {
    return {
        type: "DELETE_CLOTH",
        payload: id
    }
}

export {
    clothLoaded,
    clothRequested,
    categoryLoaded,
    userLoaded,
    addClothToCart,
    deleteClothFromCart,
    logout,
    promotionUploaded,
    addPromotion,
    deletePromotion,
    deleteCloth
}