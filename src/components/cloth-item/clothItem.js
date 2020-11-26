import React, {Component} from 'react'
import {connect} from "react-redux"
import {addClothToCart} from "../../actions"
import WithClothService from "../hoc"
import {Card, UncontrolledCarousel, CardText, CardBody,
        CardTitle, CardSubtitle, Button, Dropdown, 
        DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap'

import "./clothItem.css"

class ClothItem extends Component {

    state = {
        dropdownOpen: false
    }

    toggle = () => {
        const {dropdownOpen} = this.state
        this.setState({dropdownOpen: !dropdownOpen})
    }

    addClothToCart = (cloth) => {
        const {addClothToCart} = this.props

        addClothToCart(cloth)
    }

    onClothDelete = (id) => {
        const {clothService, token} = this.props

        clothService.performDeleteRequest(`/clothes/${id}`, {"accessToken": token})
            .then(res => {
                
            })
    }

    render() {
        const {clothItem: {name, color, description, price, id, lineSizes, images}, roles} = this.props
        const {dropdownOpen} = this.state

        const imagesForRender = images.map((image, i) => {
            ++i
            return {
                src: `data:image/jpeg;base64,${image}`,
                key: i
            }
        })

        const renderDeleteButton = roles.includes("ROLE_ADMIN") ? 
                                    <Button onClick={() => this.onClothDelete(id)}>Delete</Button> : 
                                    null

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
                                <Button onClick={() => addClothToCart({
                                    id
                                })}>Add to cart</Button>
                                <Dropdown direction="right" isOpen={dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret>
                                    Line sizes
                                </DropdownToggle>
                                <DropdownMenu>
                                    {
                                        lineSizes.map(item => {
                                            return <DropdownItem key={item.age} toggle={false}>{item.amount}</DropdownItem>
                                        })
                                    }
                                </DropdownMenu>
                            </Dropdown>
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