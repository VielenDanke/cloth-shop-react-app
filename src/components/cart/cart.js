import React, {Component} from 'react'
import WithClothService from "../hoc"
import {connect} from 'react-redux'
import {deleteClothFromCart} from "../../actions"
import {transformToRenderedImages} from "../../services/imageService"
import {Button, ListGroup, ListGroupItem, Spinner, Row, Col, CardBody, Card, CardTitle,
        CardSubtitle, UncontrolledCarousel, CardText} from 'reactstrap'

class Cart extends Component {
    state = {
        userCart: []
    }

    componentDidMount() {
        const {cart, token} = this.props

        if (!cart || cart.length <= 0) {
            return
        }
        const ids = cart.map(item => item.id)
        
        this.fetchClothesCart(ids, token)
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

    render() {
        const {cart} = this.props
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
                <div>Total price: {totalPrice}</div>
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
        cart: state.cart
    }
}

const mapDispatchToProps = {
    deleteClothFromCart
}

export default WithClothService()(connect(mapStateToProps, mapDispatchToProps)(Cart))