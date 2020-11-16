import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clothLoaded, clothRequested} from "../../actions"
import WithClothService from "../hoc"
import Spinner from "../spinner"
import ClothItem from "../cloth-item"

import "./cloth-list.scss"

class ClothList extends Component {

    componentDidMount() {
        const {fetchedClothList, clothLoaded, clothRequested} = this.props

        clothRequested()

        fetchedClothList.then(res => clothLoaded(res))
    }

    render() {
        const {clothes, loading} = this.props

        if (loading) {
            return <Spinner/>
        }
            const renderClothList = clothes.map(item => {
                return (
                    <ClothItem key={item.id} clothItem={item}/>
                )
            })
            return (
                <ul className="cloth__list">
                    {renderClothList}
                </ul>
                         
            )
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