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

export {
    clothLoaded,
    clothRequested,
    categoryLoaded,
    userLoaded,
    addClothToCart,
    deleteClothFromCart
}