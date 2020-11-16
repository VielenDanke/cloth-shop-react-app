import React, {Component} from 'react'
import {connect} from 'react-redux'
// import * as actions from "../../actions"
import WithClothService from "../hoc"
import Spinner from "../spinner"

class ClothList extends Component {

    render() {
        const {clothes, loading} = this.props

        if (loading) {
            return <Spinner/>
        }

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

}

const mapStateToProps = (state) => {
    return {
        clothes: state.clothes
    }
}

export default WithClothService()(connect(mapStateToProps)(ClothList))