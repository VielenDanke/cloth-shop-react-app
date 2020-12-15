import React, {Component} from 'react'
import {connect} from 'react-redux'
import WithClothService from "../hoc"
import {Spinner} from "reactstrap"
import {logout} from "../../actions"

class UserCabinet extends Component {

    state = {
        user: undefined
    }

    componentDidMount() {
        const {userService, token, logout} = this.props

        userService.getUserInSession("/cabinet", "GET", {"accessToken":token})
            .then(res => {
                this.setState({
                    user: res
                })
            }).catch(resError => {
                logout()
            })
    }

    render() {
        const {user} = this.state

        if (!user) {
            return <Spinner/>
        }
        
        return (
            <>
                <div>Hello, {user.username}</div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = {
    logout
}

export default WithClothService()(connect(mapStateToProps, mapDispatchToProps)(UserCabinet))