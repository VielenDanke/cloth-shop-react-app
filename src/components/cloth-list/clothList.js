import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clothLoaded, clothRequested} from "../../actions"
import {ListGroup, ListGroupItem, Spinner} from 'reactstrap'
import WithClothService from "../hoc"
import ClothItem from "../cloth-item"

import "./clothList.css"

class ClothList extends Component {

    componentDidMount() {
        const {fetchedClothList, clothLoaded, clothRequested} = this.props

        clothRequested()

        fetchedClothList.then(res => clothLoaded(res))
    }

    componentDidUpdate(prevProps) {
        const {fetchedClothList, clothLoaded, clothRequested} = this.props

        if (this.props.pathVariable !== prevProps.pathVariable) {
            clothRequested()

            fetchedClothList.then(res => clothLoaded(res))
        }
    }
    
    render() {
        const {clothes, loading} = this.props

        if (loading) {
            return <Spinner className="spinner__cloth-list"/>
        }
        const renderClothList = clothes.map(item => {
            return (
                <ListGroupItem key={item.id}>
                        <ClothItem clothItem={item}/>
                </ListGroupItem>
            )
        })
        return (
            <ListGroup>
                {renderClothList}
            </ListGroup>       
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
