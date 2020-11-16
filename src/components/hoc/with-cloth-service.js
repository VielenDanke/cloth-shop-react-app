import React from 'react'
import ClothServiceContext from "../cloth-service-context"

const WithClothService = () => (Wrapped) => {
    return (props) => {
        return (
            <ClothServiceContext.Consumer>
                {
                    (clothService) => {
                        return <Wrapped {...props} clothService={clothService}/>
                    }
                }
            </ClothServiceContext.Consumer>
        )
    }
}

export default WithClothService