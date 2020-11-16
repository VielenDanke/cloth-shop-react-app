import React from 'react'
import {connect} from 'react-redux'
import {clothLoaded} from "../../actions"
import WithClothService from "../hoc"
import {Link} from 'react-router-dom';

const ClothHeader = ({clothService, clothes, clothLoaded}) => {

    return (
        <div>
            <Link to="/clothes/" onClick={() => clothLoaded(clothService.getClothes())}>Clothes</Link>
            <Link to="/clothes/man/" onClick={() => clothLoaded(clothService.getClothesBySex("MAN"))}>Man's clothes</Link>
            <Link to="/clothes/woman/" onClick={() => clothLoaded(clothService.getClothesBySex("WOMAN"))}>Woman's clothes</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        clothes: state.clothes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clothLoaded: (clothes) => {
            clothes.then(res => dispatch(clothLoaded(res)))
        }
    }
}

export default WithClothService()(connect(mapStateToProps, mapDispatchToProps)(ClothHeader))