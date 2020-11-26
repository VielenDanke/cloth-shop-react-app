import React, {Component} from 'react'
import {ListGroup, ListGroupItem, Spinner} from 'reactstrap'
import WithClothService from "../hoc"
import ClothItem from "../cloth-item"

import "./clothList.css"

class ClothList extends Component {

    state = {
        clothes: [],
        loading: true
    }

    componentDidMount() {
        const {fetchedClothList} = this.props

        fetchedClothList.then(res => this.setState({clothes: res, loading: false}))
    }

    componentDidUpdate(prevProps) {
        const {fetchedClothList} = this.props

        if (this.props.pathVariable !== prevProps.pathVariable) {
            fetchedClothList.then(res => this.setState({clothes: res, loading: false}))
        }
    }
    
    render() {
        const {clothes, loading} = this.state

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

export default WithClothService()(ClothList)
