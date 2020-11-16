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

export {
    clothLoaded,
    clothRequested,
    categoryLoaded
}