import React, {Component} from 'react'
import {connect} from 'react-redux'
// import * as actions from "../../actions"
import WithClothService from "../hoc"
import Spinner from "../spinner"
import ClothItem from "../cloth-item"

import "./cloth-list.scss"

class ClothList extends Component {

    render() {
        const {clothes, loading} = this.props

        if (loading) {
            return <Spinner/>
        }

        if (clothes && clothes.length !== 0) {

            const renderClothList = clothes.map(item => {
                return (
                    <ClothItem clothItem={item}/>
                )
            })
            return (
                <ul className="cloth__list">
                    {renderClothList}
                </ul>
                         
            )
        } else {
            return <h1>Empty</h1>
        }
    }

}

const mapStateToProps = (state) => {
    return {
        clothes: state.clothes
    }
}

export default WithClothService()(connect(mapStateToProps)(ClothList))