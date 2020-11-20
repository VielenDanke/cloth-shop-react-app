import React, {Component} from 'react'
import WithClothService from '../hoc'
import {ACCESS_TOKEN} from "../../constants"
import Spinner from '../spinner'
import {connect} from 'react-redux'

class Cabinet extends Component {

    state = {
        user: null,
        error: false,
        promotionName: "",
        promotionDescription: "",
        promotionId: ""
    }

    componentDidMount() {
        const {userService} = this.props
    
        userService.getUserInSession("/cabinet", "GET", {"accessToken":localStorage.getItem(ACCESS_TOKEN)})
            .then(res => {
                this.setState({
                    user: res
                })
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

    handleSubmit = (event) => {
        event.preventDefault()

        const {promotionName, promotionDescription} = this.state
        const {clothService} = this.props

        const promotionSaveRequest = {
            name: promotionName,
            description: promotionDescription
        }
        
        clothService.performRequest(
            "POST", 
            {"Content-Type":"application/json", "accessToken":localStorage.getItem(ACCESS_TOKEN)}, 
            promotionSaveRequest, "/promotions"
        ).then(res => {
            console.log(res)
            this.setState({
                promotionId: res.id
            })
        })
    }

    renderComponentDependsOnRole = (role) => {
        if (role === "ROLE_ADMIN") {
            return (
                <form onSubmit={this.handleSubmit}>
                    <input type="text" 
                        name="promotionName" 
                        className="form-control" 
                        placeholder="Promotion Name"
                        onChange={this.handleInputChanges} 
                        value={this.state.promotionName}/>
                    <input type="text" 
                        name="promotionDescription" 
                        className="form-control" 
                        placeholder="Promotion Description" 
                        onChange={this.handleInputChanges} 
                        value={this.state.promotionDescription}
                        />
                    <button type="submit">Create Promotion</button>
                </form>                    
            )
        } else {
            return
        }
    }

    renderPromotionIdComponent = (promotionId) => {
        if (promotionId) {

        } else {
            return
        }
    }

    render() {
        const {user, error} = this.state
        const {roles} = this.props

        if (!user) {
            return <Spinner/>
        }

        if (error) {
            return <h1>Something went wrong</h1>
        }

        return (
            <div>
                <h1>Hello, {user.username}</h1>
                {this.renderComponentDependsOnRole(roles)}        
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roles: state.roles
    }
}

export default WithClothService()(connect(mapStateToProps)(Cabinet))