import React, {Component} from 'react'
import WithClothService from '../hoc'

class Cabinet extends Component {

    componentDidMount() {
        const {userService} = this.props
    
        console.log("Cabinet did mount")
    }

    render() {
        return (
            <h1>Hello, this is cabinet</h1>
        )
    }
}

export default WithClothService()(Cabinet)