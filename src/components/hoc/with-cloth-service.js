import React from 'react'
import ClothServiceContext from "../cloth-service-context"

const WithClothService = () => (Wrapped) => {
    return (props) => {
        return (
            <ClothServiceContext.Consumer>
                {
                    ({clothService, categoryService}) => {
                        return <Wrapped {...props} clothService={clothService} categoryService={categoryService}/>
                    }
                }
            </ClothServiceContext.Consumer>
        )
    }
}

export default WithClothService