import React, {Component} from 'react'
import {connect} from 'react-redux'
import WithClothService from "../hoc"
import {deleteClothFromCart} from "../../actions"
import {Button, ListGroup, ListGroupItem, Spinner} from 'reactstrap'

class UserCabinet extends Component {

    state = {
        user: undefined,
        userCart: []
    }

    componentDidMount() {
        const {userService, token, cart, clothService} = this.props

        userService.getUserInSession("/cabinet", "GET", {"accessToken":token})
            .then(res => {
                this.setState({
                    user: res
                })
            })

        const ids = cart.map(item => item.id)
        
        this.fetchClothesCart(clothService, ids, token)
    }

    componentDidUpdate(prevProps, prevState) {
        const {cart, clothService, token} = this.props

        const ids = cart.map(item => item.id)

        if (prevProps.cart.length !== cart.length) {
            this.fetchClothesCart(clothService, ids, token)
        }
    }

    fetchClothesCart = (clothService, ids, token) => {
        clothService.performRequest(
            "POST", 
            {"accessToken":token, "Content-Type":"application/json"},
             ids, 
             "/clothes/cart")
        .then(res => {
            this.setState({
                userCart: res
            })
        })
    }

    onDeleteFromCart = (id) => {
        const {deleteClothFromCart} = this.props

        deleteClothFromCart(id)
    }

    render() {
        const {user, userCart} = this.state

        const renderedCart = userCart.map(item => {
            return (
                <ListGroupItem key={item.id}>
                    {item.name}, {item.description}, {item.sex}
                    <Button onClick={() => this.onDeleteFromCart(item.id)}>Delete from cart</Button>
                </ListGroupItem>
            )
        })

        if (!user || !userCart) {
            return <Spinner/>
        }
        
        return (
            <>
                <div>Hello, {user.username}</div>
                <div>
                    <ListGroup>
                        {renderedCart}
                    </ListGroup>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        cart: state.cart
    }
}

const mapDispatchToProps = {
    deleteClothFromCart
}

export default WithClothService()(connect(mapStateToProps, mapDispatchToProps)(UserCabinet))