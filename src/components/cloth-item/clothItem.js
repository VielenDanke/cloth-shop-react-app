import React, {Component} from 'react'
import {connect} from "react-redux"
import {addClothToCart} from "../../actions"
import WithClothService from "../hoc"
import {Card, UncontrolledCarousel, CardText, CardBody,
        CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap'

import "./clothItem.css"

class ClothItem extends Component {

    state = {
        dropdownOpen: false,
        lineSize: `${this.props.clothItem.lineSizes[0].age} ${this.props.clothItem.lineSizes[0].height} ${this.props.clothItem.lineSizes[0].amount}`
    }

    clothToCart = (cloth) => {
        const {addClothToCart} = this.props

        addClothToCart(cloth)
    }

    handleOptionLineSizeChanges = (event) => {
        this.setState({
            lineSize: event.target.value
        })
    }

    render() {
        const {clothItem: {name, color, description, price, id, lineSizes, images}, 
                          roles, onClothDelete, cart} = this.props
        const {lineSize} = this.state

        const renderLineSizes = lineSizes.filter(item => item.amount > 0).map(item => {
            return (
                <option value={`${item.age} ${item.height} ${item.amount}`}>Age: {item.age}, Height: {item.height}, Amount: {item.amount}</option>
            )
        })

        const imagesForRender = images.map((image, i) => {
            ++i
            return {
                src: `data:image/jpeg;base64,${image}`,
                key: i
            }
        })

        const renderDeleteButton = roles.includes("ROLE_ADMIN") ? 
                                    <Button onClick={(event) => onClothDelete(id, event)}>Delete</Button> : 
                                    null
        
        const splittedLineSize = lineSize.split(" ")

        const clothCartItem = {
            id: id,
            age: Number.parseInt(splittedLineSize[0]),
            height: splittedLineSize[1],
            amount: Number.parseInt(splittedLineSize[2])
        }

        const renderAddButton = cart.find(item => item.id === id) ? 
                                <CardText>Already in the cart</CardText> :
                                <Button onClick={() => this.clothToCart(clothCartItem)}>Add to cart</Button>

        return (
                <Row>
                    <Col sm="3">
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">{name}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{color}</CardSubtitle>
                            </CardBody>
                            <UncontrolledCarousel className="image__list-item" autoPlay={false} items={imagesForRender} />
                            <CardBody>
                                <CardText>{price} KZT</CardText>
                                <CardText>{description}</CardText>
                                <label>
                                    Choose line size
                                    <select value={this.state.lineSize} onChange={this.handleOptionLineSizeChanges}>
                                        {renderLineSizes}
                                    </select>
                                </label>
                                {renderAddButton}
                                {renderDeleteButton}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>    
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        roles: state.roles,
        token: state.token
    }
}

const mapDispatchToProps = {
    addClothToCart
}

export default WithClothService()(connect(mapStateToProps, mapDispatchToProps)(ClothItem))