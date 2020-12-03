const transformToRenderedImages = (images) => {
    return images.map((image, i) => {
        ++i
        return {
            src: `data:image/jpeg;base64,${image}`,
            key: i
        }
    })
}

export {
    transformToRenderedImages
}