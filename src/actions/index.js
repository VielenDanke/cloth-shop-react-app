const clothLoaded = (clothList) => {
    return {
        type: "CLOTH_LIST",
        payload: clothList
    }
}

export {
    clothLoaded
}