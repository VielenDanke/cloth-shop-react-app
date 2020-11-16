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

export {
    clothLoaded,
    clothRequested
}