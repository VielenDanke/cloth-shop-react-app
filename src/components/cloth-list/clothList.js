import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clothLoaded, clothRequested} from "../../actions"
import {ListGroup, ListGroupItem} from 'reactstrap'
import WithClothService from "../hoc"
import Spinner from "../spinner"
import ClothItem from "../cloth-item"

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
            return <Spinner/>
        }
        const renderClothList = clothes.map(item => {
            return (
                <ListGroupItem>
                    <ClothItem key={item.id} clothItem={item}/>
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
