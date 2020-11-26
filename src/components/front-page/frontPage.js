import React, {Component} from 'react'
import { Spinner, UncontrolledCarousel } from 'reactstrap';

import "./frontPage.css"

class FrontPage extends Component {

    state = {
        promotions: [],
        loading: true
    }

    componentDidMount() {
        const {clothService} = this.props

        clothService.getPromotions()
            .then(res => {
                this.setState({
                    promotions: res,
                    loading: false
                })
            })
    }
    
    render() {
        const {promotions, loading} = this.state

        if (loading) {
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

export default FrontPage