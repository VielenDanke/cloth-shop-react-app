import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clothLoaded, clothRequested} from "../../actions"
import WithClothService from "../hoc"
import Spinner from "../spinner"
import ClothItem from "../cloth-item"

import "./cloth-list.scss"

class ClothList extends Component {

    componentDidMount() {
        const {clothes, clothLoaded, clothRequested} = this.props

        if (clothes.length !== 0) {
            clothRequested()

            clothes.then(res => clothLoaded(res))
        }
    }

    render() {
        const {clothes} = this.props

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
        clothes: state.clothes,
        loading: state.loading
    }
}

const mapDispatchToProps = {
    clothLoaded, clothRequested
}

export default WithClothService()(connect(mapStateToProps, mapDispatchToProps)(ClothList))