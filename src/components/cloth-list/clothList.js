import React from 'react'
import {connect} from 'react-redux'
import * as actions from "../../actions"

const ClothList = ({clothService, clothState, clothLoaded}) => {
    const {clothes} = clothState

    if (clothes && clothes.length !== 0) {

        const renderClothList = clothes.map(item => {
            return (
                <li key={item.id}>{item.name}</li>
            )
        })
        return (
            <ul>
                {renderClothList}
            </ul>
                     
        )
    } else {
        return <h1>Empty</h1>
    }

}

const mapStateToProps = (state) => {
    return {
        clothState: state
    }
}

export default connect(mapStateToProps, actions)(ClothList)