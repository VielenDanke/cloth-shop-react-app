import React, {Component} from 'react'
import { UncontrolledCarousel } from 'reactstrap';

class FrontPage extends Component {

    state = {
        promotions: []
    }

    componentDidMount() {
        const {clothService} = this.props

        clothService.getPromotions()
            .then(res => {
                this.setState({promotions: res})
            })
    }
    
    render() {
        const {promotions} = this.state

        console.log(promotions)

        const mappedPromotions = promotions.map((item, i) => {
            return {
                src: `data:image/jpeg;base64,${item.image}`,
                caption: `${item.description}`,
                header: `${item.name}`,
                key: ++i
            }
        })

        return (
            <UncontrolledCarousel items={mappedPromotions}/>
        )
    }
}

export default FrontPage