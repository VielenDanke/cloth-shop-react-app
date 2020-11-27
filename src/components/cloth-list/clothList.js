import React, {Component} from 'react'
import {ListGroup, ListGroupItem, Spinner} from 'reactstrap'
import WithClothService from "../hoc"
import ClothItem from "../cloth-item"
import {connect} from 'react-redux'

import "./clothList.css"

class ClothList extends Component {

    state = {
        clothes: [],
        loading: true
    }

    componentDidMount() {
        const {clothService, gender, category} = this.props

        clothService.getClothesByCategoryAndSex(gender, category)
                .then(res => this.setState({clothes: res, loading: false}))
    }

    componentDidUpdate(prevProps, prevState) {
        const {clothService, gender, category} = this.props
        const {loading} = this.state

        if (this.props.pathVariable !== prevProps.pathVariable) {
            clothService.getClothesByCategoryAndSex(gender, category)
                .then(res => this.setState({clothes: res, loading: false}))
        }
        if (loading) {
            clothService.getClothesByCategoryAndSex(gender, category)
                .then(res => this.setState({clothes: res, loading: false}))
        }
    }

    onClothDelete = (id, event) => {
        event.preventDefault()

        const {clothService, token} = this.props
        const {clothes} = this.state

        clothService.performDeleteRequest(`/clothes/${id}`, {"accessToken": token})
            .then(res => {
                const itemIndex = clothes.findIndex(item => item.id === id)

                this.setState({
                    clothes: [
                        clothes.slice(0, itemIndex),
                        clothes.slice(itemIndex + 1)
                    ],
                    loading: true
                })
            })
    }
    
    render() {
        const {clothes, loading} = this.state

        if (loading) {
            return <Spinner className="spinner__cloth-list"/>
        }
        const renderClothList = clothes.map(item => {
            return (
                <ListGroupItem key={item.id}>
                        <ClothItem clothItem={item} onClothDelete={this.onClothDelete}/>
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
        token: state.token
    }
}

export default WithClothService()(connect(mapStateToProps)(ClothList))
