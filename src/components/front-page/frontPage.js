import React, {Component} from 'react'
import { Spinner, UncontrolledCarousel } from 'reactstrap';
import {promotionUploaded} from "../../actions"
import {connect} from "react-redux"

import "./frontPage.css"

class FrontPage extends Component {

    componentDidMount() {
        const {clothService, promotionUploaded} = this.props

        clothService.getPromotions()
            .then(res => {
                promotionUploaded(res)
            })
    }
    
    render() {
        const {promotions} = this.props

        if (!promotions || promotions.length === 0) {
            return <Spinner/>
        }

        const mappedPromotions = promotions.map((item, i) => {
            return {
                src: `data:image/jpeg;base64,${item.image}`,
                caption: `${item.description}`,
                header: `${item.name}`,
                altText: `${item.name}`,
                key: ++i
            }
        })

        return (
            <UncontrolledCarousel className="carousel__promotion" items={mappedPromotions}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        promotions: state.promotions
    }
}

const mapDispatchToProps = {
    promotionUploaded
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)