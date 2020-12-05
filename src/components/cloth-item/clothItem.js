import React, {Component} from 'react'
import {connect} from "react-redux"
import {addClothToCart} from "../../actions"
import WithClothService from "../hoc"
import {transformToRenderedImages} from "../../services/imageService"
import {Card, UncontrolledCarousel, CardText, CardBody,
        CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap'

import "./clothItem.css"

class ClothItem extends Component {

    state = {
        dropdownOpen: false,
        lineSize: `${this.props.clothItem.lineSizes[0].age} ${this.props.clothItem.lineSizes[0].height} ${this.props.clothItem.lineSizes[0].amount}`,
        amountToBuy: ""
    }

    clothToCart = () => {
        const {addClothToCart, clothItem: {id, price}} = this.props
        const {amountToBuy, lineSize} = this.state

        const splittedLineSize = lineSize.split(" ")

        const numAmountToBuy = Number.parseInt(amountToBuy)

        if (numAmountToBuy !== 0 && numAmountToBuy <= Number.parseInt(splittedLineSize[2])) {

            const clothCartItem = {
                id: id,
                age: Number.parseInt(splittedLineSize[0]),
                height: splittedLineSize[1],
                amount: numAmountToBuy,
                price: price
            }
            addClothToCart(clothCartItem)
        } else {
            return
        }
    }

    handleOptionLineSizeChanges = (event) => {
        this.setState({
            lineSize: event.target.value
        })
    }

    handleInputChanges = (event) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        this.setState({
            [inputName]: inputValue
        })
    }

    render() {
        const {clothItem: {name, color, description, price, id, lineSizes, images}, 
                          roles, onClothDelete, cart} = this.props

        const renderLineSizes = lineSizes.filter(item => item.amount > 0).map(item => {
            return (
                <option value={`${item.age} ${item.height} ${item.amount}`}>Age: {item.age}, Height: {item.height}, Amount: {item.amount}</option>
            )
        })

        const imagesForRender = transformToRenderedImages(images)

        const renderDeleteButton = roles.includes("ROLE_ADMIN") ? 
                                    <Button onClick={(event) => onClothDelete(id, event)}>Delete</Button> : 
                                    null

        const renderAddButton = cart.find(item => item.id === id) ? 
                                <CardText>Already in the cart</CardText> :
                                <Button onClick={() => this.clothToCart()}>Add to cart</Button>

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
                                <label>
                                    Amount of cloth to buy
                                    <input type="number"
                                    name="amountToBuy"
                                    placeholder="Amount to buy"
                                    value={this.state.amountToBuy}
                                    onChange={this.handleInputChanges}/>
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