import React, {Component} from 'react'

import "./cloth-list-item.scss"

class ClothItem extends Component {
    render() {
        const {clothItem: {name, color, description, price}} = this.props

        return (
            <li className="cloth__item">
                <div className="cloth__title">{name}</div>
                <img className="cloth__img" src="" alt="Cloth"></img>
                <div className="cloth__category">Description: <span>{description}</span></div>
                <div className="cloth__category">Color: <span>{color}</span></div>
                <div className="cloth__price">Price: <span>{price} KZT</span></div>
                <button className="cloth__btn">Add to cart</button>
            </li>
        )
    }
}

export default ClothItem