import React, {Component} from 'react'
import WithClothService from "../hoc"
import {connect} from 'react-redux'
import {deleteClothFromCart} from "../../actions"
import {transformToRenderedImages} from "../../services/imageService"
import {Button, ListGroup, ListGroupItem, Spinner, Row, Col, CardBody, Card, CardTitle,
        CardSubtitle, UncontrolledCarousel, CardText} from 'reactstrap'

class Cart extends Component {
    state = {
        userCart: [],
        checkout: false,
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
        
        this.fetchClothesCart(ids, false)
    }

    componentDidUpdate(prevProps, prevState) {
        const {cart} = this.props

        const ids = cart.map(item => item.id)

        if (prevProps.cart.length !== cart.length) {
            this.fetchClothesCart(ids, false)
        }
    }

    fetchClothesCart = (ids, checkout) => {
        const {clothService} = this.props

        clothService.performRequest(
            "POST", 
            {"Content-Type":"application/json"},
             ids, 
             "/clothes/cart")
        .then(res => {
            this.setState({
                userCart: res,
                checkout: checkout
            })
        })
    }

    onDeleteFromCart = (id) => {
        const {deleteClothFromCart} = this.props

        deleteClothFromCart(id)
    }

    proceedingToCheckout = () => {
        const {cart, userService} = this.props

        userService.getConfigurableResource(
            "/cart/reserve", 
            "POST",
            {"Content-Type":"application/json"},
            {
                clothCartList: cart
            }
        ).then(res => {
            const headers = res.headers

            localStorage.setItem("STATE_ID", headers.get("STATE_ID"))

            return res
        })
        .then(res => res.json())
        .then(res => res.map(item => item.id))
        .then(ids => this.fetchClothesCart(ids, true))
    }

    checkoutSubmit = (event) => {
        event.preventDefault()
    }

    render() {
        const {cart, token, roles, userService} = this.props
        const {userCart, checkout} = this.state

        if (!userCart) {
            return <Spinner/>
        }

        if ((token && token.length > 0) && (roles && roles.length > 0)) {
            userService.getUserInSession("/cabinet", "GET", {"accessToken":token})
                .then(res => this.setState({
                    firstName: res.firstName,
                    lastName: res.surname,
                    city: res.city,
                    address: res.address,
                    phoneNumber: res.phoneNumber,
                    email: res.username
                }))
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

        console.log(cart)

        cart.forEach(item => {
            totalPrice += (item.amount * item.price)
        })
        return (
            <>
                <div>Total price: {totalPrice}</div>
                <div>
                    <ListGroup>
                        {renderedCart}
                    </ListGroup>
                </div>
                {checkout ? 
                        <div>
                            <form onSubmit={this.checkoutSubmit()}>
                                
                            </form>
                        </div> : 
                        null}
                <div>
                    <Button onClick={this.proceedingToCheckout}>Proceeding to checkout</Button>
                </div>

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        token: state.token,
        roles: state.roles
    }
}

const mapDispatchToProps = {
    deleteClothFromCart
}

export default WithClothService()(connect(mapStateToProps, mapDispatchToProps)(Cart))