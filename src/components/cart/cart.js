import React, {Component} from 'react'
import WithClothService from "../hoc"
import Checkout from "../checkout"
import {connect} from 'react-redux'
import {deleteClothFromCart, addStateID} from "../../actions"
import {transformToRenderedImages} from "../../services/imageService"
import {Button, ListGroup, ListGroupItem, Spinner, Row, Col, CardBody, Card, CardTitle,
        CardSubtitle, UncontrolledCarousel, CardText} from 'reactstrap'

class Cart extends Component {
    state = {
        userCart: [],
        firstName: "",
        lastName: "",
        city: "",
        address: "",
        phoneNumber: "",
        email: ""
    }

    componentDidMount() {
        const {cart} = this.props

        if (!cart || cart.length <= 0) {
            return
        }
        const ids = cart.map(item => item.id)
        
        this.fetchClothesCart(ids)
    }

    componentDidUpdate(prevProps, prevState) {
        const {cart} = this.props

        const ids = cart.map(item => item.id)

        if (prevProps.cart.length !== cart.length) {
            this.fetchClothesCart(ids)
        }
    }

    fetchClothesCart = (ids) => {
        const {clothService} = this.props

        clothService.performRequest(
            "POST", 
            {"Content-Type":"application/json"},
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

    proceedingToCheckout = () => {
        const {cart, userService, addStateID} = this.props

        let stateID

        userService.getConfigurableResource(
            "/cart/reserve", 
            "POST",
            {"Content-Type":"application/json"},
            {
                clothCartList: cart
            }
        ).then(res => {
            const headers = res.headers

            stateID = headers.get("STATE_ID")

            return res
        })
        .then(res => userService.getConfigurableResource(
            "/cart/retrieve",
            "POST",
            {"Content-Type":"application/json", "STATE_ID":stateID},
            null
        ))
        .then(res => res.json())
        .then(res => {
            res.clothCartList.map(item => item.id)
        })
        .then(ids => {
            this.fetchClothesCart(ids)
            addStateID(stateID)
        })
    }

    render() {
        const {cart, stateID} = this.props
        const {userCart} = this.state

        if (!userCart) {
            return <Spinner/>
        }

        const renderedCart = userCart.map(item => {
            const cartItem = cart.find(itemCart => itemCart.id === item.id)
            return (
                <ListGroupItem key={item.id}>
                    <Row>
                        <Col sm="3">
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">{item.name}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">{item.color}</CardSubtitle>
                                </CardBody>
                                <UncontrolledCarousel className="image__list-item" autoPlay={false} items={transformToRenderedImages(item.images)}/>
                                <CardBody>
                                    <CardText>Price: {item.price} KZT</CardText>
                                    <CardText>Description: {item.description}</CardText>
                                    <CardText>Gender: {item.gender}</CardText>
                                    <CardText>Amount: {cartItem ? cartItem.amount : null}</CardText>
                                </CardBody>
                                <Button onClick={() => this.onDeleteFromCart(item.id)}>Delete from cart</Button>
                            </Card>
                        </Col>
                    </Row>    
                </ListGroupItem>
            )
        })

        let totalPrice = 0

        cart.forEach(item => {
            totalPrice += (item.amount * item.price)
        })

        return (
            <>
                {stateID && stateID !== null && stateID.length > 0 ? 
                        <Checkout/> : 
                        <>
                            <div>Total price: {totalPrice}</div>
                            <div>
                                <ListGroup>
                                    {renderedCart}
                                </ListGroup>
                            </div>
                            <div>
                                <Button onClick={this.proceedingToCheckout}>Proceeding to checkout</Button>
                            </div>
                        </>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        stateID: state.stateID
    }
}

const mapDispatchToProps = {
    deleteClothFromCart,
    addStateID
}

export default WithClothService()(connect(mapStateToProps, mapDispatchToProps)(Cart))