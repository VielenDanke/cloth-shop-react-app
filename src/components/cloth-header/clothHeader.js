import React from 'react'
import {connect} from 'react-redux'
import * as actions from "../../actions"

const ClothHeader = ({clothService, clothes, clothLoaded}) => {
    return (
        <div>
            <button onClick={() => clothLoaded(clothService.getClothes())}>All Cloth</button>
            <button onClick={() => clothLoaded(clothService.getClothesBySex("MAN"))}>Man</button>
            <button onClick={() => clothLoaded(clothService.getClothesBySex("WOMAN"))}>Woman</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        clothes: state
    }
}

export default connect(mapStateToProps, actions)(ClothHeader)