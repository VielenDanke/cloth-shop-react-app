import React, {Component} from 'react'
import {connect} from 'react-redux'
import WithClothService from "../hoc"
import {ListGroup, ListGroupItem, Spinner} from 'reactstrap'

class UserCabinet extends Component {

    state = {
        user: undefined,
        userCart: undefined
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

    render() {
        const {user, userCart} = this.state

        const renderedCart = userCart.map(item => {
            return (
                <ListGroupItem key={item.id}>
                    {item.age}, {item.height}, {item.amount}
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

export default WithClothService()(connect(mapStateToProps)(UserCabinet))